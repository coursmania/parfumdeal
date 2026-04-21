// Vercel Edge Middleware — Dynamic Rendering
// Bots (Googlebot, etc.) get the static HTML pages.
// Real users are redirected to the SPA.

const BOT_UA = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|linkedinbot|applebot|semrushbot|ahrefsbot|rogerbot|dotbot|msnbot|ia_archiver|sogou|exabot|alexa/i;

// Gender hints for brand pages → better UX redirect
const BRAND_REDIRECT = {
  'parfums-inspires-dior':             '/?go=homme',
  'parfums-inspires-chanel':           '/?go=femme',
  'parfums-inspires-ysl':              '/?go=femme',
  'parfums-inspires-armani':           '/?go=homme',
  'parfums-inspires-paco-rabanne':     '/?go=homme',
  'parfums-inspires-lancome':          '/?go=femme',
  'parfums-inspires-mugler':           '/?go=femme',
  'parfums-inspires-creed':            '/?go=homme',
  'parfums-inspires-versace':          '/?go=homme',
  'parfums-inspires-hermes':           '/',
  'parfums-inspires-maison-francis-kurkdjian': '/?go=femme',
  'parfums-inspires-carolina-herrera': '/?go=femme',
  'parfums-inspires-gucci':            '/?go=femme',
  'parfums-inspires-valentino':        '/?go=femme',
  'parfums-inspires-parfums-de-marly': '/?go=homme',
  'parfums-inspires-tom-ford':         '/',
  'parfums-inspires-prada':            '/?go=femme',
  'parfums-inspires-chloe':            '/?go=femme',
  'parfums-inspires-givenchy':         '/',
  'parfums-inspires-guerlain':         '/?go=femme',
  'parfums-inspires-hugo-boss':        '/?go=homme',
  'parfums-inspires-jean-paul-gaultier':'/?go=homme',
  'parfums-inspires-kenzo':            '/',
  'parfums-inspires-montblanc':        '/?go=homme',
  'parfums-inspires-narciso-rodriguez':'/?go=femme',
  'parfums-inspires-azzaro':           '/?go=homme',
  'parfums-inspires-burberry':         '/',
  'parfums-inspires-viktor-rolf':      '/?go=femme',
};

export default function middleware(request) {
  const ua = request.headers.get('user-agent') || '';

  // Let bots through — they will get the static HTML
  if (BOT_UA.test(ua)) return;

  const pathname = new URL(request.url).pathname.replace(/\/$/, '');
  const slug = pathname.slice(1); // remove leading /

  // Determine redirect target
  const dest = BRAND_REDIRECT[slug] || '/';

  return Response.redirect(new URL(dest, request.url), 302);
}

export const config = {
  matcher: [
    '/parfums-inspires-(.*)',
    '/casablanca',
    '/rabat',
    '/marrakech',
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
  ],
};
