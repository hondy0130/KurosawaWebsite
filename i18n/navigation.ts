import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// 言語を考慮した Link / useRouter / usePathname
// 例: 英語表示中に <Link href="/about"> → /en/about
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
