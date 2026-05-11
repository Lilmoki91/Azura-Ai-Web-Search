// functions/worker.js
// Ini adalah Pengawal Keselamatan (Gatekeeper) untuk Azura AI

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const cookieHeader = request.headers.get('Cookie') || '';
    const cookies = Object.fromEntries(
      cookieHeader.split('; ').map(c => c.split('='))
    );

    // 1. Periksa sama ada pengguna mempunyai token buka kunci yang sah.
    if (cookies[STASIS_COOKIE_NAME] === SECRET_UNLOCK_TOKEN) {
      // Token sah! Dapatkan index.html sebenar dari pelayan asal.
      let originUrl = new URL(url.pathname, 'https://azura-ai-web-search.pages.dev');
      return fetch(originUrl.toString());
    }

    // 2. Jika tiada token atau tidak sah, hantar skrin mati (stasis-lock.html).
    let stasisUrl = new URL('/stasis-lock.html', 'https://azura-ai-web-search.pages.dev');
    const stasisResponse = await fetch(stasisUrl.toString());
    
    // Kembalikan halaman stasis.
    return new Response(stasisResponse.body, {
      status: 403,
      headers: stasisResponse.headers
    });
  },
};
