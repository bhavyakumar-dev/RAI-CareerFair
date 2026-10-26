export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/v2' || url.pathname === '/v2/') {
      return env.ASSETS.fetch(new Request(new URL('/v2.html', request.url), request));
    }
    return env.ASSETS.fetch(request);
  },
};
