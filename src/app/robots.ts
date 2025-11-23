import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo.config';

/**
 * Optimized robots.txt for maximum search engine indexing
 * Allows all major search engines with strategic crawl delays
 */

export default function robots(): MetadataRoute.Robots {
    const baseUrl = SITE_CONFIG.url;

    return {
        rules: [
            // Google Bot - Highest priority
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/admin', '/api', '/_next', '/private'],
                crawlDelay: 0,
            },
            // Google Image Bot
            {
                userAgent: 'Googlebot-Image',
                allow: ['/images', '/uploads', '/*.jpg', '/*.png', '/*.webp'],
            },
            // Bing Bot
            {
                userAgent: 'Bingbot',
                allow: '/',
                disallow: ['/admin', '/api', '/_next', '/private'],
                crawlDelay: 1,
            },
            // Yandex Bot (Russia)
            {
                userAgent: 'Yandex',
                allow: '/',
                disallow: ['/admin', '/api', '/_next', '/private'],
                crawlDelay: 1,
            },
            // Baidu Bot (China)
            {
                userAgent: 'Baiduspider',
                allow: '/',
                disallow: ['/admin', '/api', '/_next', '/private'],
                crawlDelay: 2,
            },
            // DuckDuckGo Bot
            {
                userAgent: 'DuckDuckBot',
                allow: '/',
                disallow: ['/admin', '/api', '/_next', '/private'],
            },
            // Sogou (China)
            {
                userAgent: 'Sogou',
                allow: '/',
                disallow: ['/admin', '/api', '/_next', '/private'],
                crawlDelay: 2,
            },
            // All other bots
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/api', '/_next', '/private'],
                crawlDelay: 2,
            },
        ],
        sitemap: [
            `${baseUrl}/sitemap.xml`,
            `${baseUrl}/news-sitemap.xml`, // For Google News
        ],
        host: baseUrl,
    };
}
