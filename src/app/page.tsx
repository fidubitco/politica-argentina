'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsCard from '@/components/news/NewsCard';
import { MOCK_NEWS } from '@/lib/mock-data';
import styles from './page.module.css';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Home() {
  const featuredNews = MOCK_NEWS.find(n => n.featured) || MOCK_NEWS[0];
  const secondaryNews = MOCK_NEWS.filter(n => !n.featured).slice(0, 4);
  const latestNews = MOCK_NEWS.slice(1);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

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
          url: 'https://polargofficial2026.vercel.app/logo.png', // Placeholder
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
    <main ref={containerRef}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <div className={`container ${styles.main} `}>
        <motion.section
          className={styles.heroGrid}
          variants={container}
          initial="hidden"
          animate="show"
          style={{ position: 'relative' }}
        >
          {/* Featured Article (Large) */}
          <motion.div variants={item} className={styles.featuredCard} style={{ y }}>
            <Link href={`/noticias/${featuredNews.id}`} style={{ display: 'block', height: '100%', width: '100%' }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.9))',
                zIndex: 1
              }}></div>
              <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#1e293b',
                position: 'absolute',
                top: 0,
                left: 0
              }}></div>

              <div className={styles.cardContent}>
                <span className={styles.category}>{featuredNews.category}</span>
                <h2 className={styles.title}>{featuredNews.title}</h2>
                <p className={styles.excerpt}>{featuredNews.excerpt}</p>
                <span className={styles.date}>{featuredNews.date}</span>
              </div>
            </Link>
          </motion.div>

          {/* Secondary Articles (Grid) */}
          {secondaryNews.map((news) => (
            <motion.div key={news.id} variants={item} className={styles.secondaryCard}>
              <Link href={`/noticias/${news.id}`} style={{ display: 'block', height: '100%', width: '100%' }}>
                <div style={{
                  height: '150px',
                  width: '100%',
                  backgroundColor: '#cbd5e1'
                }}></div>
                <div className={styles.cardContent}>
                  <span className={styles.category}>{news.category}</span>
                  <h3 className={styles.title}>{news.title}</h3>
                  <span className={styles.date}>{news.date}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.section>

        <section className="section" style={{ position: 'relative', zIndex: 10, background: 'var(--background)' }}>
          <h2 className={styles.sectionTitle}>Últimas Noticias</h2>
          <motion.div
            className={styles.latestGrid}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {latestNews.map((news) => (
              <motion.div key={news.id} variants={item}>
                <NewsCard article={news} />
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
