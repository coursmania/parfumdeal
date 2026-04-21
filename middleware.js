// Vercel Edge Middleware — Dynamic Rendering
// Bots get the static HTML pages.
// Real users are redirected to the SPA's native URLs.

const BOT_UA = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|linkedinbot|applebot|semrushbot|ahrefsbot|rogerbot|dotbot|msnbot|ia_archiver|sogou|exabot|alexa/i;

// Brand pages → redirect to SPA collection URL (SPA handles /parfums-femme and /parfums-homme natively)
const BRAND_REDIRECT = {
  'parfums-inspires-dior':             '/parfums-homme',
  'parfums-inspires-chanel':           '/parfums-femme',
  'parfums-inspires-ysl':              '/parfums-femme',
  'parfums-inspires-armani':           '/parfums-homme',
  'parfums-inspires-paco-rabanne':     '/parfums-homme',
  'parfums-inspires-lancome':          '/parfums-femme',
  'parfums-inspires-mugler':           '/parfums-femme',
  'parfums-inspires-creed':            '/parfums-homme',
  'parfums-inspires-versace':          '/parfums-homme',
  'parfums-inspires-hermes':           '/parfums-homme',
  'parfums-inspires-maison-francis-kurkdjian': '/parfums-femme',
  'parfums-inspires-carolina-herrera': '/parfums-femme',
  'parfums-inspires-gucci':            '/parfums-femme',
  'parfums-inspires-valentino':        '/parfums-femme',
  'parfums-inspires-parfums-de-marly': '/parfums-homme',
  'parfums-inspires-tom-ford':         '/parfums-homme',
  'parfums-inspires-prada':            '/parfums-femme',
  'parfums-inspires-chloe':            '/parfums-femme',
  'parfums-inspires-givenchy':         '/parfums-homme',
  'parfums-inspires-guerlain':         '/parfums-femme',
  'parfums-inspires-hugo-boss':        '/parfums-homme',
  'parfums-inspires-jean-paul-gaultier':'/parfums-homme',
  'parfums-inspires-kenzo':            '/parfums-femme',
  'parfums-inspires-montblanc':        '/parfums-homme',
  'parfums-inspires-narciso-rodriguez':'/parfums-femme',
  'parfums-inspires-azzaro':           '/parfums-homme',
  'parfums-inspires-burberry':         '/parfums-homme',
  'parfums-inspires-viktor-rolf':      '/parfums-femme',
};

export default function middleware(request) {
  const ua = request.headers.get('user-agent') || '';

  // Let bots through — they will get the static HTML
  if (BOT_UA.test(ua)) return;

  const pathname = new URL(request.url).pathname.replace(/\/$/, '');
  const slug = pathname.slice(1); // remove leading /

  // Brand pages → SPA collection
  if (BRAND_REDIRECT[slug]) {
    return Response.redirect(new URL(BRAND_REDIRECT[slug], request.url), 302);
  }

  // City pages not handled by SPA natively → SPA homepage
  return Response.redirect(new URL('/', request.url), 302);
}

export const config = {
  matcher: [
    // Brand pages (regex syntax for Vercel)
    '/(parfums-inspires-.*)',
    // City pages NOT in SPA (SPA only has casablanca/rabat/marrakech natively)
    '/tanger',
    '/fes',
    '/agadir',
    '/oujda',
    '/meknes',
    '/kenitra',
    '/tetouan',
    '/nador',
    '/el-jadida',
    '/safi',
    '/beni-mellal',
    '/settat',
    '/larache',
    // casablanca/rabat/marrakech are NOT in matcher:
    // the SPA handles them natively, and the HTML page is a good fallback
  ],
};
