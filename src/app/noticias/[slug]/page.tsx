import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MOCK_NEWS } from '@/lib/mock-data';
import styles from './page.module.css';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = MOCK_NEWS.find(n => n.id === slug);

    if (!article) {
        notFound();
    }

    return (
        <main>
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

                <div className={styles.content}>
                    <p className="lead" style={{ fontSize: '1.25rem', fontWeight: '500', color: 'var(--foreground)' }}>
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
            </article>

            <Footer />
        </main>
    );
}
