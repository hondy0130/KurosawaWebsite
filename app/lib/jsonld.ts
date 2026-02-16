/**
 * 構造化データ（JSON-LD）定義
 * Google 検索のリッチリザルトに対応するための構造化データ
 */

const SITE_URL = 'https://www.kurosawa-vn.net';
const SITE_NAME = 'Kurosawa Consulting Vietnam';

/**
 * Organization 構造化データ
 * 企業情報をGoogleに伝える
 */
export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    alternateName: ['KCV', 'クロサワ・コンサルティング・ベトナム'],
    url: SITE_URL,
    logo: `${SITE_URL}/kcv-logo.webp`,
    description:
      '日本企業のベトナム進出・現地法人運営を支援する総合コンサルティングファーム',
    foundingDate: '2016',
    parentOrganization: {
      '@type': 'Organization',
      name: '黒澤合同事務所グループ',
      url: 'https://www.kurosawa.gr.jp/',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+84-28-3520-0043',
        contactType: 'customer service',
        areaServed: 'VN',
        availableLanguage: ['Japanese', 'Vietnamese', 'English'],
      },
    ],
    sameAs: ['https://www.facebook.com/KurosawaVN/'],
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress:
          '4th Floor, Phuong Long Building, 506 Nguyen Dinh Chieu Street',
        addressLocality: 'Ho Chi Minh City',
        addressRegion: 'Ban Co Ward',
        addressCountry: 'VN',
      },
      {
        '@type': 'PostalAddress',
        streetAddress:
          '22F, Ngoc Khanh Plaza Building, No.1 Pham Huy Thong Street',
        addressLocality: 'Hanoi',
        addressRegion: 'Ba Dinh District',
        addressCountry: 'VN',
      },
    ],
  };
}

/**
 * WebSite 構造化データ
 * サイト情報とサイト内検索（将来対応可能）
 */
export function getWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'ja',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/kcv-logo.webp`,
      },
    },
  };
}

/**
 * LocalBusiness 構造化データ（ホーチミンオフィス）
 */
export function getHCMOfficeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${SITE_NAME} - Ho Chi Minh Office`,
    image: `${SITE_URL}/images/Office.jpg`,
    url: SITE_URL,
    telephone: '+84-28-3520-0043',
    email: 'KCV_JBS_HCM@kurosawa.vn',
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        '4th Floor, Phuong Long Building, 506 Nguyen Dinh Chieu Street',
      addressLocality: 'Ho Chi Minh City',
      addressRegion: 'Ban Co Ward',
      addressCountry: 'VN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.7769,
      longitude: 106.6884,
    },
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'Vietnam',
    },
    parentOrganization: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  };
}

/**
 * LocalBusiness 構造化データ（ハノイオフィス）
 */
export function getHanoiOfficeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${SITE_NAME} - Hanoi Office`,
    url: SITE_URL,
    telephone: '+84-90-2852-032',
    email: 'KCV_JBS_HCM@kurosawa.vn',
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        '22F, Ngoc Khanh Plaza Building, No.1 Pham Huy Thong Street',
      addressLocality: 'Hanoi',
      addressRegion: 'Ba Dinh District',
      addressCountry: 'VN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 21.0285,
      longitude: 105.8109,
    },
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'Vietnam',
    },
    parentOrganization: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  };
}

/**
 * BreadcrumbList 構造化データ生成ヘルパー
 */
export function getBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
