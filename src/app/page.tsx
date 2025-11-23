import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsCard from '@/components/news/NewsCard';
import { ArticleService } from '@/lib/services/article.service';
import styles from './page.module.css';
import HeroSection from '@/components/home/HeroSection';
// import { motion } from 'framer-motion'; // This won't work in Server Component for the grid part if we use motion.div directly here?
// Actually, we can use a client wrapper for the grid too, or just use NewsCard which is client.
// But the staggered animation for the grid was in the parent.
// I'll create a LatestNewsGrid client component for the bottom part.

export default async function Home() {
  const { articles } = await ArticleService.getArticles({ published: true, limit: 10 });

  const featuredNews = articles.find((n: any) => n.featured) || articles[0];
  const secondaryNews = articles.filter((n: any) => n.id !== featuredNews?.id).slice(0, 4);
  const latestNews = articles.filter((n: any) => n.id !== featuredNews?.id && !secondaryNews.find((s: any) => s.id === n.id));

  // Helper to format article for NewsCard
  const formatArticle = (article: any) => ({
    id: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category.name,
    date: new Date(article.createdAt).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }),
    image: article.image || '/placeholder.jpg'
  });

  const featuredFormatted = featuredNews ? formatArticle(featuredNews) : null;
  const secondaryFormatted = secondaryNews.map(formatArticle);
  const latestFormatted = latestNews.map(formatArticle);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://polargofficial2026.vercel.app/#organization',
        name: 'Politica Argentina',
        url: 'https://polargofficial2026.vercel.app',
        logo: {
          '@type': 'ImageObject',
          url: 'https://polargofficial2026.vercel.app/logo.png',
          width: 112,
          height: 112
        },
        sameAs: [
          'https://twitter.com/politicaarg',
          'https://facebook.com/politicaarg'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': 'https://polargofficial2026.vercel.app/#website',
        url: 'https://polargofficial2026.vercel.app',
        name: 'Politica Argentina',
        publisher: {
          '@id': 'https://polargofficial2026.vercel.app/#organization'
        }
      }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <div className={`container ${styles.main} `}>
        <HeroSection featured={featuredFormatted} secondary={secondaryFormatted} />

        <section className="section" style={{ position: 'relative', zIndex: 10, background: 'var(--background)' }}>
          <h2 className={styles.sectionTitle}>Últimas Noticias</h2>
          <div className={styles.latestGrid}>
            {latestFormatted.map((news) => (
              <div key={news.id}>
                <NewsCard article={news} />
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
