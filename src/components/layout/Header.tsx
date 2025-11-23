'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import styles from './Header.module.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState('light');
    const { data: session } = useSession();

    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    Politica<span className={styles.highlight}>Argentina</span>
                </Link>

                {/* Desktop Nav */}
                <nav className={styles.nav}>
                    <Link href="/seccion/politica" className={styles.navLink}>Política</Link>
                    <Link href="/seccion/economia" className={styles.navLink}>Economía</Link>
                    <Link href="/seccion/sociedad" className={styles.navLink}>Sociedad</Link>
                    <Link href="/seccion/mundo" className={styles.navLink}>Mundo</Link>
                    {session && (
                        <Link href="/admin" className={styles.navLink} style={{ color: 'var(--primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <User size={16} /> Admin
                        </Link>
                    )}
                </nav>

                <div className={styles.actions}>
                    <button onClick={toggleTheme} className={styles.iconBtn} aria-label="Toggle Theme">
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    <button
                        className={styles.menuBtn}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className={styles.mobileMenu}>
                    <Link href="/seccion/politica" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>Política</Link>
                    <Link href="/seccion/economia" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>Economía</Link>
                    <Link href="/seccion/sociedad" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>Sociedad</Link>
                    <Link href="/seccion/mundo" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>Mundo</Link>
                    {session && (
                        <Link href="/admin" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--primary)' }}>
                            Panel Admin
                        </Link>
                    )}
                </div>
            )}
        </header>
    );
}
