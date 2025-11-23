import { MetadataRoute } from 'next';
import { SUPPORTED_LANGUAGES, SITE_CONFIG } from '@/lib/seo.config';
import prisma from '@/lib/prisma';

/**
 * Dynamic Sitemap Generator
 * Generates multilingual sitemap for optimal SEO
 * Target: 100M+ organic visitors
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = SITE_CONFIG.url;

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [];

    // Add homepage for all languages
    SUPPORTED_LANGUAGES.forEach(lang => {
        staticPages.push({
            url: `${baseUrl}/${lang.code}`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 1.0,
            alternates: {
                languages: Object.fromEntries(
                    SUPPORTED_LANGUAGES.map(l => [l.code, `${baseUrl}/${l.code}`])
                ),
            },
        });
    });

    // Add category pages for all languages
    const categories = ['politica', 'economia', 'sociedad', 'mundo', 'deportes', 'opinion'];

    categories.forEach(category => {
        SUPPORTED_LANGUAGES.forEach(lang => {
            staticPages.push({
                url: `${baseUrl}/${lang.code}/seccion/${category}`,
                lastModified: new Date(),
                changeFrequency: 'hourly',
                priority: 0.9,
                alternates: {
                    languages: Object.fromEntries(
                        SUPPORTED_LANGUAGES.map(l => [l.code, `${baseUrl}/${l.code}/seccion/${category}`])
                    ),
                },
            });
        });
    });

    // Dynamic article pages
    let articles: MetadataRoute.Sitemap = [];

    try {
        const publishedArticles = await prisma.article.findMany({
            where: { published: true },
            select: {
                slug: true,
                updatedAt: true,
                createdAt: true,
                featured: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        articles = publishedArticles.flatMap(article =>
            SUPPORTED_LANGUAGES.map(lang => ({
                url: `${baseUrl}/${lang.code}/noticias/${article.slug}`,
                lastModified: article.updatedAt,
                changeFrequency: 'daily' as const,
                priority: article.featured ? 0.95 : 0.85,
                alternates: {
                    languages: Object.fromEntries(
                        SUPPORTED_LANGUAGES.map(l => [l.code, `${baseUrl}/${l.code}/noticias/${article.slug}`])
                    ),
                },
            }))
        );
    } catch (error) {
        console.error('Error generating sitemap:', error);
    }

    // Additional important pages
    const additionalPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
    ];

    return [...staticPages, ...articles, ...additionalPages];
}
