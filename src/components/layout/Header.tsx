'use client';

import Link from 'next/link';
import styles from './Header.module.css';
import { Search, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check system preference or saved preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setIsDark(true);
        }
    }, []);

    const toggleTheme = () => {
        // This is a simple implementation. In a real app, use next-themes
        const newTheme = !isDark;
        setIsDark(newTheme);
        document.documentElement.style.colorScheme = newTheme ? 'dark' : 'light';
        if (newTheme) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <header className={styles.header}>
            <div className={`container ${styles.navContainer}`}>
                <Link href="/" className={styles.logo}>
                    Politica<span>Argentina</span>
                </Link>

                <nav className={styles.nav}>
                    <Link href="/seccion/politica" className={styles.navLink}>Política</Link>
                    <Link href="/seccion/economia" className={styles.navLink}>Economía</Link>
                    <Link href="/seccion/sociedad" className={styles.navLink}>Sociedad</Link>
                    <Link href="/seccion/internacionales" className={styles.navLink}>Mundo</Link>
                    <Link href="/seccion/opinion" className={styles.navLink}>Opinión</Link>
                </nav>

                <div className={styles.actions}>
                    <button className={styles.searchBtn} onClick={toggleTheme} aria-label="Cambiar Tema">
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button className={styles.searchBtn} aria-label="Buscar">
                        <Search size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
}
