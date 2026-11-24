"""Azulejo · records the site's Portuguese with a neural European Portuguese voice (Piper, "tugão").

    node tools/voice-texts.js > texts.json
    python tools/voice.py texts.json public/audio --model pt_PT-tugão-medium.onnx

Only texts that have no recording yet are synthesised, and recordings nobody uses any more are removed,
so a run after a small change takes seconds. Change VOICE_VERSION to record everything again.
"""
import argparse, io, json, os, sys, time, wave
from multiprocessing import Pool

import lameenc
import numpy as np

VOICE_VERSION = 1
RATE = 22050
LENGTH_SCALE = 1.08   # a touch slower than normal speech, for learners
GAP = 0.35            # silence between verb forms in a verb's file (seconds)
LEAD = 0.25           # silence at the start of a verb's file

_voice = None
_cfg = None


class _FakeVoice:
    """AZ_FAKE_VOICE=1: a beep per text instead of speech, to test this script without the model"""
    def synthesize_wav(self, text, w, syn_config=None):
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(RATE)
        n = int(RATE * (0.1 + 0.05 * len(text)))
        w.writeframes((np.sin(np.arange(n) * 2 * np.pi * 220 / RATE) * 8000).astype(np.int16).tobytes())


def _init(model):
    global _voice, _cfg
    if os.environ.get('AZ_FAKE_VOICE'):
        _voice, _cfg = _FakeVoice(), None
        return
    from piper import PiperVoice, SynthesisConfig
    _voice = PiperVoice.load(model)
    _cfg = SynthesisConfig(length_scale=LENGTH_SCALE)


def pcm(text):
    """int16 samples for a text"""
    buf = io.BytesIO()
    with wave.open(buf, 'wb') as w:
        _voice.synthesize_wav(text, w, syn_config=_cfg)
    buf.seek(0)
    with wave.open(buf, 'rb') as r:
        assert r.getframerate() == RATE, r.getframerate()
        return np.frombuffer(r.readframes(r.getnframes()), dtype=np.int16)


def trim(a, thresh=300, pad=0.06):
    """cut silence at both ends, keeping a little"""
    idx = np.nonzero(np.abs(a.astype(np.int32)) > thresh)[0]
    if not len(idx):
        return a
    p = int(pad * RATE)
    return a[max(0, idx[0] - p): min(len(a), idx[-1] + p)]


def mp3(a, kbps=40):
    enc = lameenc.Encoder()
    enc.set_bit_rate(kbps)
    enc.set_in_sample_rate(RATE)
    enc.set_channels(1)
    enc.set_quality(2)
    return enc.encode(a.tobytes()) + enc.flush()


def do_clip(job):
    key, text, path = job
    a = trim(pcm(text))
    with open(path, 'wb') as f:
        f.write(mp3(a))
    return key


def do_verb(job):
    slug, forms, base = job
    parts, offsets, t = [np.zeros(int(LEAD * RATE), dtype=np.int16)], {}, LEAD
    gap = np.zeros(int(GAP * RATE), dtype=np.int16)
    for key, text in forms:
        a = trim(pcm(text), pad=0.03)
        offsets[key] = [round(t, 3), round(len(a) / RATE, 3)]
        parts += [a, gap]
        t += (len(a) + len(gap)) / RATE
    with open(os.path.join(base, slug + '.mp3'), 'wb') as f:
        f.write(mp3(np.concatenate(parts), kbps=32))
    offsets['_forms'] = [k for k, _ in forms]
    with open(os.path.join(base, slug + '.json'), 'w', encoding='utf-8') as f:
        json.dump(offsets, f, separators=(',', ':'))
    return slug


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('texts')
    ap.add_argument('out')
    ap.add_argument('--model', required=True)
    ap.add_argument('--jobs', type=int, default=os.cpu_count() or 2)
    ap.add_argument('--limit', type=int, default=0, help='record at most this many new texts (for a quick test)')
    a = ap.parse_args()

    data = json.load(open(a.texts, encoding='utf-8'))
    cdir, vdir = os.path.join(a.out, 'c'), os.path.join(a.out, 'v')
    os.makedirs(cdir, exist_ok=True)
    os.makedirs(vdir, exist_ok=True)
    idx_path = os.path.join(a.out, 'index.json')
    old = json.load(open(idx_path)) if os.path.exists(idx_path) else {}
    fresh = old.get('v') != VOICE_VERSION

    # single texts
    want = {k: t for k, t in data['clips']}
    have = {f[:-4] for f in os.listdir(cdir) if f.endswith('.mp3')}
    for k in have - want.keys():
        os.remove(os.path.join(cdir, k + '.mp3'))
    todo = [(k, t, os.path.join(cdir, k + '.mp3')) for k, t in want.items() if fresh or k not in have]

    # one file per verb, redone when its list of forms changed
    vtodo = []
    for slug, forms in data['verbs'].items():
        jp = os.path.join(vdir, slug + '.json')
        same = False
        if not fresh and os.path.exists(jp) and os.path.exists(os.path.join(vdir, slug + '.mp3')):
            try:
                same = json.load(open(jp)).get('_forms') == [k for k, _ in forms]
            except Exception:
                same = False
        if not same:
            vtodo.append((slug, forms, vdir))
    for f in os.listdir(vdir):
        if f.rsplit('.', 1)[0] not in data['verbs']:
            os.remove(os.path.join(vdir, f))

    if a.limit:
        todo, vtodo = todo[:a.limit], vtodo[:max(1, a.limit // 50)]
    print(f'texts: {len(want)} ({len(todo)} to record) · verbs: {len(data["verbs"])} ({len(vtodo)} to record)', flush=True)
    t0 = time.time()
    if todo or vtodo:
        with Pool(a.jobs, initializer=_init, initargs=(a.model,)) as pool:
            for i, _ in enumerate(pool.imap_unordered(do_clip, todo, chunksize=16), 1):
                if i % 500 == 0:
                    print(f'  {i}/{len(todo)} texts · {time.time() - t0:.0f}s', flush=True)
            for i, _ in enumerate(pool.imap_unordered(do_verb, vtodo), 1):
                if i % 25 == 0:
                    print(f'  {i}/{len(vtodo)} verbs · {time.time() - t0:.0f}s', flush=True)

    done_clips = sorted(f[:-4] for f in os.listdir(cdir) if f.endswith('.mp3'))
    done_verbs = sorted(f[:-4] for f in os.listdir(vdir) if f.endswith('.mp3'))
    idx = {'v': VOICE_VERSION, 'voice': os.path.basename(a.model).replace('.onnx', ''), 'clips': ','.join(done_clips), 'verbs': ','.join(done_verbs)}
    if idx != {k: old.get(k) for k in idx}:
        with open(idx_path, 'w', encoding='utf-8') as f:
            json.dump(idx, f, separators=(',', ':'))
    size = sum(os.path.getsize(os.path.join(d, f)) for d in (cdir, vdir) for f in os.listdir(d))
    print(f'done in {time.time() - t0:.0f}s · {len(done_clips)} texts, {len(done_verbs)} verbs, {size / 1e6:.1f} MB', flush=True)


if __name__ == '__main__':
    sys.exit(main())
