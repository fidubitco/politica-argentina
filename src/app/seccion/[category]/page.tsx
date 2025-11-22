import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsCard from '@/components/news/NewsCard';
import { MOCK_NEWS } from '@/lib/mock-data';
import styles from './page.module.css';
import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';

interface PageProps {
    params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category } = await params;
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

    return {
        title: `${categoryName} | Politica Argentina`,
        description: `Últimas noticias sobre ${categoryName} en Argentina. Cobertura exclusiva y análisis profundo.`,
        openGraph: {
            title: `${categoryName} | Politica Argentina`,
            description: `Últimas noticias sobre ${categoryName} en Argentina.`,
            type: 'website',
        },
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const { category } = await params;
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

    let news = MOCK_NEWS.filter(n => n.category.toLowerCase() === category.toLowerCase());
    if (news.length === 0) news = MOCK_NEWS;

    const featured = news[0];
    const rest = news.slice(1);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [{
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: 'https://polargofficial2026.vercel.app'
        }, {
            '@type': 'ListItem',
            position: 2,
            name: categoryName,
            item: `https://polargofficial2026.vercel.app/seccion/${category}`
        }]
    };

    return (
        <main>
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Header />

            <div className="container" style={{ paddingBottom: '4rem' }}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{categoryName}</h1>
                    <div className={styles.divider}></div>
                </header>

                {/* Featured Category Article */}
                <div className={styles.featuredWrapper}>
                    <Link href={`/noticias/${featured.id}`} className={styles.featuredLink}>
                        <div className={styles.featuredImage}>
                            <div className={styles.placeholder}></div>
                        </div>
                        <div className={styles.featuredContent}>
                            <span className={styles.featuredLabel}>Destacado</span>
                            <h2 className={styles.featuredTitle}>{featured.title}</h2>
                            <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                            <span className={styles.featuredDate}>{featured.date}</span>
                        </div>
                    </Link>
                </div>

                <div className={styles.grid}>
                    {rest.map((article) => (
                        <NewsCard key={article.id} article={article} />
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
