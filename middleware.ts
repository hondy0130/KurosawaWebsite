import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // API・Next.js内部ファイル・拡張子付きの静的ファイルは対象外
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
