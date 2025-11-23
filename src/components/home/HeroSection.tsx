'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import styles from '@/app/page.module.css';

interface Article {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    image: string;
}

interface HeroSectionProps {
    featured: Article | null;
    secondary: Article[];
}

export default function HeroSection({ featured, secondary }: HeroSectionProps) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

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

    if (!featured) return null;

    return (
        <div ref={containerRef} className={styles.heroWrapper}>
            <motion.section
                className={styles.heroGrid}
                variants={container}
                initial="hidden"
                animate="show"
                style={{ position: 'relative' }}
            >
                {/* Featured Article (Large) */}
                <motion.div variants={item} className={styles.featuredCard} style={{ y }}>
                    <Link href={`/noticias/${featured.id}`} style={{ display: 'block', height: '100%', width: '100%' }}>
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
                        }}>
                            {/* In real app, use Next/Image here */}
                            {/* <img src={featured.image} alt={featured.title} style={{width: '100%', height: '100%', objectFit: 'cover'}} /> */}
                        </div>

                        <div className={styles.cardContent}>
                            <span className={styles.category}>{featured.category}</span>
                            <h2 className={styles.title}>{featured.title}</h2>
                            <p className={styles.excerpt}>{featured.excerpt}</p>
                            <span className={styles.date}>{featured.date}</span>
                        </div>
                    </Link>
                </motion.div>

                {/* Secondary Articles (Grid) */}
                {secondary.map((news) => (
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
        </div>
    );
}
