/**
 * EXTREME SEO CONFIGURATION
 * Target: 100M+ organic visitors globally
 * Languages: Top 10 global languages
 * Premium luxury global news portal
 */

export const SUPPORTED_LANGUAGES = [
    { code: 'es', name: 'Español', flag: '🇪🇸', native: 'Español' },
    { code: 'en', name: 'English', flag: '🇬🇧', native: 'English' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳', native: '中文' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳', native: 'हिन्दी' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦', native: 'العربية' },
    { code: 'pt', name: 'Portuguese', flag: '🇧🇷', native: 'Português' },
    { code: 'bn', name: 'Bengali', flag: '🇧🇩', native: 'বাংলা' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺', native: 'Русский' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', native: '日本語' },
    { code: 'fr', name: 'French', flag: '🇫🇷', native: 'Français' },
] as const;

export const DEFAULT_LANGUAGE = 'es';

export const SITE_CONFIG = {
    name: 'Política Argentina',
    shortName: 'PolArg',
    description: {
        es: 'Portal premium de noticias políticas, económicas y sociales de Argentina. Análisis profundo, cobertura en tiempo real.',
        en: 'Premium news portal for Argentine politics, economy, and society. In-depth analysis, real-time coverage.',
        zh: '阿根廷政治、经济和社会的高级新闻门户。深入分析，实时报道。',
        hi: 'अर्जेंटीना राजनीति, अर्थव्यवस्था और समाज के लिए प्रीमियम समाचार पोर्टल।',
        ar: 'بوابة أخبار مميزة للسياسة والاقتصاد والمجتمع الأرجنتينية.',
        pt: 'Portal premium de notícias sobre política, economia e sociedade argentina.',
        bn: 'আর্জেন্টিনার রাজনীতি, অর্থনীতি এবং সমাজের জন্য প্রিমিয়াম নিউজ পোর্টাল।',
        ru: 'Премиум-портал новостей о политике, экономике и обществе Аргентины.',
        ja: 'アルゼンチンの政治、経済、社会に関するプレミアムニュースポータル。',
        fr: 'Portail d\'actualités premium sur la politique, l\'économie et la société argentine.',
    },
    keywords: {
        es: 'noticias argentina, política argentina, economía argentina, actualidad, breaking news, análisis político, Buenos Aires',
        en: 'argentina news, argentine politics, economy, current affairs, breaking news, political analysis, Buenos Aires',
        zh: '阿根廷新闻,阿根廷政治,经济,时事,突发新闻,政治分析,布宜诺斯艾利斯',
        hi: 'अर्जेंटीना समाचार, अर्जेंटीना राजनीति, अर्थव्यवस्था, समसामयिक मुद्दे',
        ar: 'أخبار الأرجنتين، السياسة الأرجنتينية، الاقتصاد، الشؤون الجارية',
        pt: 'notícias argentina, política argentina, economia, atualidades, breaking news',
        bn: 'আর্জেন্টিনা খবর, আর্জেন্টিনা রাজনীতি, অর্থনীতি, সাম্প্রতিক বিষয়',
        ru: 'новости аргентины, политика аргентины, экономика, текущие события',
        ja: 'アルゼンチンニュース、アルゼンチン政治、経済、時事問題',
        fr: 'actualités argentine, politique argentine, économie, actualités',
    },
    url: 'https://polargofficial2026.vercel.app',
    logo: '/logo-politica.png',
    ogImage: '/og-image.png',
    twitterHandle: '@PoliticaArg',
    facebookPage: 'PoliticaArgentina',
    organization: {
        name: 'Política Argentina Media Group',
        foundingDate: '2025',
        founders: ['Editorial Team'],
        address: {
            streetAddress: 'Av. Corrientes 1234',
            addressLocality: 'Buenos Aires',
            addressRegion: 'CABA',
            postalCode: 'C1043',
            addressCountry: 'AR',
        },
        contactPoint: {
            telephone: '+54-11-4567-8900',
            contactType: 'Customer Service',
            email: 'contacto@politica-argentina.com.ar',
            areaServed: 'AR',
            availableLanguage: SUPPORTED_LANGUAGES.map(l => l.code),
        },
    },
};

export const SEO_CONFIG = {
    // Robots meta
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    // Open Graph defaults
    openGraph: {
        type: 'website',
        locale: 'es_AR',
        alternateLocale: SUPPORTED_LANGUAGES.filter(l => l.code !== 'es').map(l => `${l.code}_${l.code.toUpperCase()}`),
        siteName: SITE_CONFIG.name,
        images: [
            {
                url: `${SITE_CONFIG.url}/og-image.png`,
                width: 1200,
                height: 630,
                alt: SITE_CONFIG.name,
            },
        ],
    },

    // Twitter Card
    twitter: {
        handle: SITE_CONFIG.twitterHandle,
        site: SITE_CONFIG.twitterHandle,
        cardType: 'summary_large_image',
    },

    // Verification codes
    verification: {
        google: 'your-google-site-verification',
        yandex: 'your-yandex-verification',
        bing: 'your-bing-verification',
    },

    // Additional meta tags
    additionalMetaTags: [
        {
            name: 'application-name',
            content: SITE_CONFIG.name,
        },
        {
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
        },
        {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black-translucent',
        },
        {
            name: 'apple-mobile-web-app-title',
            content: SITE_CONFIG.shortName,
        },
        {
            name: 'format-detection',
            content: 'telephone=no',
        },
        {
            name: 'mobile-web-app-capable',
            content: 'yes',
        },
        {
            name: 'theme-color',
            content: '#1e40af',
        },
        {
            name: 'msapplication-TileColor',
            content: '#1e40af',
        },
    ],

    // Canonical URL strategy
    canonical: {
        strategy: 'pathname', // Use pathname for canonical to handle language versions
    },
};

/**
 * Generate hreflang links for multilingual SEO
 */
export function generateHreflangLinks(pathname: string) {
    return SUPPORTED_LANGUAGES.map(lang => ({
        rel: 'alternate',
        hreflang: lang.code,
        href: `${SITE_CONFIG.url}/${lang.code}${pathname}`,
    })).concat([
        {
            rel: 'alternate',
            hreflang: 'x-default',
            href: `${SITE_CONFIG.url}${pathname}`,
        },
    ]);
}

/**
 * Generate JSON-LD Organization schema
 */
export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'NewsMediaOrganization',
        name: SITE_CONFIG.organization.name,
        url: SITE_CONFIG.url,
        logo: {
            '@type': 'ImageObject',
            url: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
            width: 600,
            height: 60,
        },
        foundingDate: SITE_CONFIG.organization.foundingDate,
        founders: SITE_CONFIG.organization.founders.map(name => ({
            '@type': 'Person',
            name,
        })),
        address: {
            '@type': 'PostalAddress',
            ...SITE_CONFIG.organization.address,
        },
        contactPoint: {
            '@type': 'ContactPoint',
            ...SITE_CONFIG.organization.contactPoint,
        },
        sameAs: [
            `https://twitter.com/${SITE_CONFIG.twitterHandle.replace('@', '')}`,
            `https://facebook.com/${SITE_CONFIG.facebookPage}`,
        ],
        publishingPrinciples: `${SITE_CONFIG.url}/about/ethics`,
        diversityPolicy: `${SITE_CONFIG.url}/about/diversity`,
        ethicsPolicy: `${SITE_CONFIG.url}/about/ethics`,
        masthead: `${SITE_CONFIG.url}/about/team`,
        missionCoveragePrioritiesPolicy: `${SITE_CONFIG.url}/about/mission`,
    };
}

/**
 * Generate JSON-LD WebSite schema with SearchAction
 */
export function generateWebSiteSchema(language: string = 'es') {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
        description: SITE_CONFIG.description[language as keyof typeof SITE_CONFIG.description],
        inLanguage: SUPPORTED_LANGUAGES.map(l => l.code),
        publisher: {
            '@type': 'Organization',
            name: SITE_CONFIG.organization.name,
            logo: {
                '@type': 'ImageObject',
                url: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
            },
        },
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };
}

/**
 * Generate JSON-LD NewsArticle schema
 */
export function generateArticleSchema(article: any, language: string = 'es') {
    return {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: article.title,
        description: article.excerpt,
        image: {
            '@type': 'ImageObject',
            url: `${SITE_CONFIG.url}${article.image}`,
            width: 1200,
            height: 630,
        },
        datePublished: article.createdAt,
        dateModified: article.updatedAt,
        author: {
            '@type': 'Person',
            name: article.author?.name || 'Editorial Team',
            url: `${SITE_CONFIG.url}/author/${article.author?.id}`,
        },
        publisher: {
            '@type': 'Organization',
            name: SITE_CONFIG.organization.name,
            logo: {
                '@type': 'ImageObject',
                url: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
                width: 600,
                height: 60,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_CONFIG.url}/${language}/noticias/${article.slug}`,
        },
        articleSection: article.category?.name,
        keywords: article.keywords || SITE_CONFIG.keywords[language as keyof typeof SITE_CONFIG.keywords],
        inLanguage: language,
        isAccessibleForFree: true,
        wordCount: article.content?.split(' ').length || 0,
    };
}

/**
 * Generate JSON-LD BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
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

export default SEO_CONFIG;
