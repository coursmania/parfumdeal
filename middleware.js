export default async function middleware(request) {
  const ua = request.headers.get('user-agent') || '';
  const isBot = /googlebot|bingbot|yandex|baidu|duckduck|crawler|spider/i.test(ua);
  const pathname = new URL(request.url).pathname;
  const hasStaticHtml = /^\/(parfums-femme|parfums-homme|blog)\/.+/.test(pathname);

  if (isBot && hasStaticHtml) {
    return fetch(new URL(pathname + '.html', request.url));
  }

  return fetch(new URL('/index.html', request.url));
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
