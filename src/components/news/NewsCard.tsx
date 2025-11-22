'use client';

import Link from 'next/link';
import styles from './NewsCard.module.css';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

interface NewsCardProps {
    article: {
        id: string;
        title: string;
        excerpt: string;
        category: string;
        date: string;
        image: string;
    };
}

export default function NewsCard({ article }: NewsCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={styles.cardWrapper}
        >
            <Link href={`/noticias/${article.id}`} className={styles.card}>
                <div className={styles.imageContainer}>
                    {/* Placeholder for image - in real app use Next/Image */}
                    <div className={styles.placeholder} style={{ backgroundColor: '#e2e8f0' }}></div>
                    <div className={styles.overlay} />
                </div>
                <div className={styles.content}>
                    <span className={styles.category}>{article.category}</span>
                    <h3 className={styles.title}>{article.title}</h3>
                    <p className={styles.excerpt}>{article.excerpt}</p>
                    <span className={styles.date}>{article.date}</span>
                </div>
            </Link>
        </motion.div>
    );
}
