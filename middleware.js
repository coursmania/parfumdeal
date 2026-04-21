// Vercel Edge Middleware — Dynamic Rendering (brand pages only)
// - Bots → static HTML (for SEO indexing)
// - Real users → SPA collection page
// City pages are NOT intercepted: users land directly on the HTML city page (intended behavior)

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

export default function middleware(request) {
  const ua = request.headers.get('user-agent') || '';

  // Bots: pass through → Vercel serves the static HTML brand page
  if (BOT_UA.test(ua)) return;

  const slug = new URL(request.url).pathname.replace(/^\/|\/$/g, '');

  // Real users on a brand page → redirect to the matching SPA collection
  const dest = BRAND_REDIRECT[slug];
  if (dest) {
    return Response.redirect(new URL(dest, request.url), 302);
  }
}

export const config = {
  // Only intercept brand pages — city pages are intentionally NOT listed
  matcher: ['/(parfums-inspires-.*)'],
};
