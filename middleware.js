// Vercel Edge Middleware — Bot detection
// Bots (Googlebot, Bingbot...) → laissés passer → HTML statique servi par cleanUrls → SEO parfait
// Vrais utilisateurs → reçoivent index.html (SPA) → refresh reste dans l'app

export default async function middleware(request) {
  const ua = request.headers.get('user-agent') || '';
  const isBot = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebot|crawler|spider|bot/i.test(ua);

  if (isBot) return; // laisse passer → Vercel sert le HTML statique

  const indexUrl = new URL('/index.html', request.url);
  return fetch(indexUrl.toString());
}

export const config = {
  matcher: [
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
