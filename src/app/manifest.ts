import { MetadataRoute } from 'next';

/**
 * PWA Manifest for mobile optimization
 * Enables install-to-homescreen and offline capabilities
 */

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Política Argentina - Premium News Portal',
        short_name: 'PolArg',
        description: 'Portal premium de noticias políticas, económicas y sociales de Argentina',
        start_url: '/',
        display: 'standalone',
        background_color: '#1e40af',
        theme_color: '#1e40af',
        orientation: 'portrait-primary',
        categories: ['news', 'politics', 'business'],
        lang: 'es-AR',
        dir: 'ltr',
        icons: [
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any maskable',
            },
            {
                src: '/icon-256x256.png',
                sizes: '256x256',
                type: 'image/png',
            },
            {
                src: '/icon-384x384.png',
                sizes: '384x384',
                type: 'image/png',
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any maskable',
            },
        ],
        screenshots: [
            {
                src: '/screenshot-mobile.png',
                sizes: '540x720',
                type: 'image/png',
                form_factor: 'narrow',
            },
            {
                src: '/screenshot-desktop.png',
                sizes: '1280x720',
                type: 'image/png',
                form_factor: 'wide',
            },
        ],
        shortcuts: [
            {
                name: 'Últimas noticias',
                short_name: 'Noticias',
                description: 'Ver últimas noticias',
                url: '/?utm_source=homescreen',
                icons: [{ src: '/icon-96x96.png', sizes: '96x96' }],
            },
            {
                name: 'Política',
                short_name: 'Política',
                description: 'Noticias de política',
                url: '/seccion/politica',
                icons: [{ src: '/icon-politics.png', sizes: '96x96' }],
            },
            {
                name: 'Economía',
                short_name: 'Economía',
                description: 'Noticias de economía',
                url: '/seccion/economia',
                icons: [{ src: '/icon-economy.png', sizes: '96x96' }],
            },
        ],
        related_applications: [],
        prefer_related_applications: false,
    };
}
