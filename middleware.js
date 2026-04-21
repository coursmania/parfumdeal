// Vercel Edge Middleware
// 1. Brand pages (/parfums-inspires-*): bots → static HTML, users → SPA collection
// 2. SPA routes (/parfums-femme, /coffrets, /blog, etc.): serve index.html directly
//    (cleanUrls:true + missing .html file causes 404, so middleware handles it)

const BOT_UA = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|linkedinbot|applebot|semrushbot|ahrefsbot|rogerbot|dotbot|msnbot|ia_archiver|sogou|exabot|alexa/i;

const BRAND_REDIRECT = {
  'parfums-inspires-dior':              '/parfums-homme',
  'parfums-inspires-chanel':            '/parfums-femme',
  'parfums-inspires-ysl':               '/parfums-femme',
  'parfums-inspires-armani':            '/parfums-homme',
  'parfums-inspires-paco-rabanne':      '/parfums-homme',
  'parfums-inspires-lancome':           '/parfums-femme',
  'parfums-inspires-mugler':            '/parfums-femme',
  'parfums-inspires-creed':             '/parfums-homme',
  'parfums-inspires-versace':           '/parfums-homme',
  'parfums-inspires-hermes':            '/parfums-homme',
  'parfums-inspires-maison-francis-kurkdjian': '/parfums-femme',
  'parfums-inspires-carolina-herrera':  '/parfums-femme',
  'parfums-inspires-gucci':             '/parfums-femme',
  'parfums-inspires-valentino':         '/parfums-femme',
  'parfums-inspires-parfums-de-marly':  '/parfums-homme',
  'parfums-inspires-tom-ford':          '/parfums-homme',
  'parfums-inspires-prada':             '/parfums-femme',
  'parfums-inspires-chloe':             '/parfums-femme',
  'parfums-inspires-givenchy':          '/parfums-homme',
  'parfums-inspires-guerlain':          '/parfums-femme',
  'parfums-inspires-hugo-boss':         '/parfums-homme',
  'parfums-inspires-jean-paul-gaultier':'/parfums-homme',
  'parfums-inspires-kenzo':             '/parfums-femme',
  'parfums-inspires-montblanc':         '/parfums-homme',
  'parfums-inspires-narciso-rodriguez': '/parfums-femme',
  'parfums-inspires-azzaro':            '/parfums-homme',
  'parfums-inspires-burberry':          '/parfums-homme',
  'parfums-inspires-viktor-rolf':       '/parfums-femme',
};

export default async function middleware(request) {
  const url = new URL(request.url);
  const slug = url.pathname.replace(/^\/|\/$/g, '');
  const ua = request.headers.get('user-agent') || '';

  // ── Brand pages ──────────────────────────────────────────────────────────
  if (slug.startsWith('parfums-inspires-')) {
    if (BOT_UA.test(ua)) return; // bots: pass through to static HTML
    const dest = BRAND_REDIRECT[slug];
    if (dest) return Response.redirect(new URL(dest, request.url), 302);
    return;
  }

  // ── SPA routes: serve index.html while keeping the URL ───────────────────
  // Vercel's cleanUrls:true returns 404 when .html file is missing.
  // Fetching index.html here bypasses that and lets the SPA handle routing.
  const indexUrl = new URL('/index.html', request.url);
  return fetch(indexUrl.toString());
}

export const config = {
  matcher: [
    // Brand pages
    '/(parfums-inspires-.*)',
    // SPA routes that have no static .html file
    '/parfums-femme',
    '/parfums-femme/:path*',
    '/parfums-homme',
    '/parfums-homme/:path*',
    '/coffrets',
    '/coffrets/:path*',
    '/blog',
    '/blog/:path*',
    '/parfum-du-mois',
    '/livraison-gratuite',
    '/wishlist',
    '/parfums-boises-maroc',
    '/parfums-floraux-maroc',
    '/parfums-frais-maroc',
    '/parfums-orientaux-maroc',
  ],
};
