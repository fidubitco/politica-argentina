import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsCard from '@/components/news/NewsCard';
import { MOCK_NEWS } from '@/lib/mock-data';
import styles from './page.module.css';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Script from 'next/script';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = MOCK_NEWS.find(n => n.id === slug);

    if (!article) {
        return {
            title: 'Artículo no encontrado',
        };
    }

    return {
        title: `${article.title} | Politica Argentina`,
        description: article.excerpt,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            type: 'article',
            publishedTime: new Date().toISOString(), // In real app use article.date
            authors: ['Redacción Politica Argentina'],
            images: [
                {
                    url: 'https://polargofficial2026.vercel.app/og-image.jpg', // Placeholder
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.excerpt,
        },
    };
}

export default async function ArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = MOCK_NEWS.find(n => n.id === slug);

    if (!article) {
        notFound();
    }

    const relatedNews = MOCK_NEWS.filter(n => n.category === article.category && n.id !== article.id).slice(0, 3);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: article.title,
        description: article.excerpt,
        image: [
            'https://polargofficial2026.vercel.app/og-image.jpg'
        ],
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        author: [{
            '@type': 'Organization',
            name: 'Politica Argentina',
            url: 'https://polargofficial2026.vercel.app'
        }]
    };

    return (
        <main>
            <Script
                id="article-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Header />

            <article className={styles.articleContainer}>
                <header className={styles.header}>
                    <span className={styles.category}>{article.category}</span>
                    <h1 className={styles.title}>{article.title}</h1>
                    <div className={styles.meta}>
                        <time>{article.date}</time>
                        <span>Por Redacción</span>
                    </div>
                </header>

                <div className={styles.imageContainer}>
                    {/* Placeholder for main image */}
                    <div style={{ width: '100%', height: '100%', backgroundColor: '#cbd5e1' }}></div>
                </div>

                <div className={styles.contentWrapper}>
                    <div className={styles.shareSidebar}>
                        <div className={styles.stickyShare}>
                            <button className={styles.shareBtn} aria-label="Compartir en Twitter">𝕏</button>
                            <button className={styles.shareBtn} aria-label="Compartir en Facebook">f</button>
                            <button className={styles.shareBtn} aria-label="Compartir en LinkedIn">in</button>
                        </div>
                    </div>

                    <div className={styles.content}>
                        <p className="lead" style={{ fontSize: '1.25rem', fontWeight: '500', color: 'var(--foreground)', lineHeight: '1.6', marginBottom: '2rem' }}>
                            {article.excerpt}
                        </p>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>

                        <p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>

                        <h2>Análisis de la situación</h2>

                        <p>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>

                        <blockquote>
                            "Es un momento histórico para la Argentina, donde las decisiones que tomemos hoy definirán el futuro de las próximas generaciones."
                        </blockquote>

                        <p>
                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                        </p>
                    </div>
                </div>
            </article>

            <section className="section container" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '2rem', borderBottom: '2px solid var(--accent)', paddingBottom: '0.5rem', display: 'inline-block' }}>Noticias Relacionadas</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {relatedNews.map(news => (
                        <NewsCard key={news.id} article={news} />
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
