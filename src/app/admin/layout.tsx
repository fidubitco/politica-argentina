import Link from 'next/link';
import styles from './admin.module.css';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.brand}>PoliticaAdmin</div>
                <nav className={styles.nav}>
                    <Link href="/admin" className={styles.navLink}>Dashboard</Link>
                    <Link href="/admin/noticias" className={styles.navLink}>Noticias</Link>
                    <Link href="/admin/editor" className={styles.navLink}>Nueva Noticia</Link>
                    <Link href="/admin/seo" className={styles.navLink}>SEO Audit Tool</Link>
                    <Link href="/" className={styles.navLink}>Ver Sitio</Link>
                </nav>
            </aside>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}
