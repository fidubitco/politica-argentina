import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsCard from '@/components/news/NewsCard';
import { MOCK_NEWS } from '@/lib/mock-data';
import styles from './page.module.css';

interface PageProps {
    params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
    const { category } = await params;

    // Simple normalization for mock data matching
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

    // Filter news (in a real app this would be an API call)
    // For demo purposes, if no matches, show all or random
    let news = MOCK_NEWS.filter(n => n.category.toLowerCase() === category.toLowerCase());

    if (news.length === 0) {
        // Fallback for demo if category doesn't match exactly
        news = MOCK_NEWS;
    }

    return (
        <main>
            <Header />

            <div className="container">
                <header className={styles.header}>
                    <h1 className={styles.title}>{categoryName}</h1>
                </header>

                <div className={styles.grid}>
                    {news.map((article) => (
                        <NewsCard key={article.id} article={article} />
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
