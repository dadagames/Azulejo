/* Azulejo · the recorded voice.
   Every fixed Portuguese text on the site (words, example sentences, readings, verb forms) is recorded
   ahead of time with a neural European Portuguese voice (Piper, voice "tugão"), by the GitHub workflow
   (tools/voice.py). This file finds and plays those recordings.
     audio/index.json   { v, clips: "key,key,…", verbs: "slug,slug,…" }
     audio/c/<key>.mp3  one text
     audio/v/<slug>.mp3 every form of one verb, with audio/v/<slug>.json = { "<key>": [start, duration], … }
   The same key() runs in Node (tools/voice-texts.js), so both sides agree on the file names. */
(function (root) {
  'use strict';

  // the text as it is spoken: no gap markers or emphasis, "o/a" read as "o", single spaces
  function spoken(text) {
    return String(text || '').normalize('NFC').replace(/[{}*_]/g, '').replace(/[“”«»"]/g, '').replace(/\bo\/a /gi, 'o ').replace(/\s+/g, ' ').trim();
  }
  const norm = text => spoken(text).toLowerCase();
  // cyrb53: a 53-bit hash, written in base 36 (about 11 characters)
  function key(text) {
    const str = norm(text);
    let h1 = 0xdeadbeef ^ 0x41, h2 = 0x41c6ce57 ^ 0x41;
    for (let i = 0, ch; i < str.length; i++) { ch = str.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
  }
  const api = { spoken, norm, key };
  if (typeof module === 'object' && module.exports) { module.exports = api; return; }

  /* ---------------- in the browser ---------------- */
  const base = (root.AZ_CONFIG && root.AZ_CONFIG.audio) || 'audio/';
  let index = null, loading = null;
  const clips = new Set(), verbs = new Set();
  api.load = function () {
    if (index) return Promise.resolve(index);
    if (!loading) loading = fetch(base + 'index.json', { cache: 'no-cache' }).then(r => (r.ok ? r.json() : null)).then(j => {
      if (!j) return (index = { v: 0 });
      (j.clips || '').split(',').forEach(k => k && clips.add(k));
      (j.verbs || '').split(',').forEach(s => s && verbs.add(s));
      api.version = j.v || 0;
      return (index = j);
    }).catch(() => (index = { v: 0 }));
    return loading;
  };
  api.ready = () => !!index && clips.size > 0;
  api.hasClip = text => clips.has(key(text));
  api.has = text => found(key(text));

  // one <audio> element for single texts; speed changes keep the pitch
  let el = null, playing = null;
  function audioEl() {
    if (!el) { el = new Audio(); el.preload = 'auto'; try { el.preservesPitch = true; el.webkitPreservesPitch = true; } catch (e) {} }
    return el;
  }
  // Web Audio for verb forms, cut from one file per verb
  let ctx = null, srcNode = null;
  const sprites = []; // { slug, map, buf | promise }
  function audioCtx() {
    if (!ctx) { const C = root.AudioContext || root.webkitAudioContext; if (C) ctx = new C(); }
    if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {});
    return ctx;
  }
  api.loadVerb = function (slug) {
    if (!slug || !verbs.has(slug)) return Promise.resolve(null);
    let s = sprites.find(x => x.slug === slug);
    if (s) return s.promise;
    s = { slug, map: {}, buf: null };
    s.promise = fetch(base + 'v/' + slug + '.json').then(r => r.json()).then(map => {
      s.map = map;
      return fetch(base + 'v/' + slug + '.mp3').then(r => r.arrayBuffer());
    }).then(ab => new Promise((res, rej) => { const c = audioCtx(); if (!c) return rej(new Error('no audio')); c.decodeAudioData(ab, res, rej); }))
      .then(buf => { s.buf = buf; return s; }).catch(() => { s.map = {}; return null; });
    sprites.unshift(s); if (sprites.length > 4) sprites.pop();
    return s.promise;
  };

  api.stop = function () {
    if (playing && playing.done) { const d = playing.done; playing = null; d(false); }
    if (el) { try { el.pause(); el.removeAttribute('src'); el.load(); } catch (e) {} }
    if (srcNode) { try { srcNode.onended = null; srcNode.stop(); } catch (e) {} srcNode = null; }
  };
  const found = k => clips.has(k) || sprites.some(s => s.map[k] && s.buf);
  // play a text if it was recorded; returns false straight away if it wasn't.
  // Two or three words that were recorded separately (tenho + falado, não + fales) are played one after the other.
  api.play = function (text, opts = {}) {
    const k = key(text);
    if (!found(k)) {
      const words = spoken(text).split(' ');
      if (words.length < 2 || words.length > 3 || !words.every(w => found(key(w)))) return false;
      let i = 0, stopped = false;
      const next = ok => {
        if (stopped || ok === false || i >= words.length) { if (opts.onend) opts.onend(ok !== false); return; }
        const w = words[i++];
        if (!api.play(w, { rate: opts.rate, onend: ok2 => { if (ok2 === false) stopped = true; next(ok2); } })) next(false);
      };
      next(true);
      return true;
    }
    const sp = sprites.find(s => s.map[k] && s.buf);
    api.stop();
    let finished = false;
    const done = ok => { if (finished) return; finished = true; if (playing && playing.done === done) playing = null; if (opts.onend) opts.onend(ok); };
    playing = { done };
    if (sp) {
      const c = audioCtx(); if (!c) return false;
      const [start, dur] = sp.map[k];
      const n = c.createBufferSource(); n.buffer = sp.buf; n.connect(c.destination);
      n.onended = () => { if (srcNode === n) srcNode = null; done(true); };
      srcNode = n; n.start(0, Math.max(0, start - 0.02), dur + 0.12);
      return true;
    }
    const a = audioEl();
    a.onended = () => done(true);
    a.onerror = () => done(false);
    a.src = base + 'c/' + k + '.mp3' + (api.version ? '?v=' + api.version : '');
    a.playbackRate = opts.rate || 1;
    const p = a.play(); if (p && p.catch) p.catch(() => done(false));
    return true;
  };
  root.AZVoice = api;
})(typeof window !== 'undefined' ? window : globalThis);
