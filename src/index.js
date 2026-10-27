export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const p = url.pathname.replace(/\/$/, '');

    // Map clean suite edition routes
    if (p === '/v1') {
      return env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request));
    }
    if (p === '/v2' || p === '/v3' || p === '/v4' || p === '/v5' || p === '/v6' || p === '/v7') {
      return env.ASSETS.fetch(new Request(new URL(`${p}.html`, request.url), request));
    }

    // Default static assets fetch
    return env.ASSETS.fetch(request);
  },
};
