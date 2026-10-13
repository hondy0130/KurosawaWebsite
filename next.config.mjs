import createNextIntlPlugin from 'next-intl/plugin';

// i18n/request.ts を読み込む next-intl プラグイン
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'media.nilto.com',
        },
        {
          protocol: 'https',
          hostname: '**.nilto.com',
        },
      ],
    },
    async redirects() {
      return [
        // 旧サイト（kurosawa-vn.com）のURLパスを新サイトにリダイレクト
        {
          source: '/company.html',
          destination: '/about',
          permanent: true,
        },
        {
          source: '/member.html',
          destination: '/about#members',
          permanent: true,
        },
        {
          source: '/daihyou.html',
          destination: '/',
          permanent: true,
        },
        {
          source: '/contact.html',
          destination: '/#contact',
          permanent: true,
        },
        {
          source: '/form.html',
          destination: '/#contact',
          permanent: true,
        },
        {
          source: '/faq.html',
          destination: '/#faq',
          permanent: true,
        },
        {
          source: '/service.html',
          destination: '/services',
          permanent: true,
        },
        {
          source: '/kyujin.html',
          destination: '/careers',
          permanent: true,
        },
        {
          source: '/recruit.html',
          destination: '/careers',
          permanent: true,
        },
        {
          source: '/blog.html',
          destination: '/articles',
          permanent: true,
        },
        {
          source: '/blog:num(\\d+).html',
          destination: '/articles',
          permanent: true,
        },
        {
          source: '/news.html',
          destination: '/articles',
          permanent: true,
        },
        {
          source: '/news:num(\\d+).html',
          destination: '/articles',
          permanent: true,
        },
      ];
    },
  };
  
  export default withNextIntl(nextConfig);
  