/* Azulejo · where progress and accounts are saved.
   api: the address of your Cloudflare Worker. The copy of Azulejo on GitHub Pages (or any other
   static host) saves through it, so the same account works on every copy of the site.
   On the Worker's own site it's used directly; set it to '' to save only in the browser. */
window.AZ_CONFIG = {
  api: 'https://azulejo.daanvanooyen60.workers.dev',

  // Cloudflare Web Analytics: how many people use the site (no cookies, no personal data).
  // In Cloudflare: Analytics → Web Analytics → your site → "JS Snippet installation", copy the
  // token (the long code after "token") and paste it between the quotes for that address.
  // Each token only works on its own address. Leave a token empty to switch analytics off there.
  analytics: {
    'dadagames.github.io': '89df23c428fe44e188352666baadf8b6',
    'azulejo.daanvanooyen60.workers.dev': '',
  },
};
