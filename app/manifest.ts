import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kurosawa Consulting Vietnam',
    short_name: 'KCV',
    description:
      '日本企業のベトナム進出・現地法人運営を支援する総合コンサルティングファーム',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#84ab52',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
