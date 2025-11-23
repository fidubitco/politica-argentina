import Link from 'next/link';
import styles from './admin.module.css';

import LogoutButton from '@/components/admin/LogoutButton';

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

                    <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                        <LogoutButton />
                    </div>
                </nav>
            </aside>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}
