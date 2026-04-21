// Vercel Edge Middleware
// Unique rôle : servir index.html pour les routes SPA qui n'ont pas de .html statique
// (cleanUrls:true retourne 404 quand le .html est absent au lieu de tomber sur le rewrite)
//
// Les pages marques (/parfums-inspires-*) et villes (/casablanca etc.)
// ne sont PAS interceptées — l'utilisateur atterrit directement sur le HTML statique,
// exactement comme un visiteur Google.

export default async function middleware(request) {
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
    '/parfum-du-mois',
    '/livraison-gratuite',
    '/wishlist',
    '/parfums-boises-maroc',
    '/parfums-floraux-maroc',
    '/parfums-frais-maroc',
    '/parfums-orientaux-maroc',
  ],
};
