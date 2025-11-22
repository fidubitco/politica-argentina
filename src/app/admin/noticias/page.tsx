import Link from 'next/link';
import styles from '../admin.module.css';
import { MOCK_NEWS } from '@/lib/mock-data';

export default function NewsManagementPage() {
    return (
        <div>
            <header className={styles.header}>
                <h1 className={styles.title}>Gestionar Noticias</h1>
                <Link href="/admin/editor" style={{ padding: '0.75rem 1.5rem', background: 'var(--primary)', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>
                    + Nueva Noticia
                </Link>
            </header>

            <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f1f5f9' }}>
                        <tr style={{ textAlign: 'left' }}>
                            <th style={{ padding: '1rem', color: '#64748b', fontWeight: '600' }}>Título</th>
                            <th style={{ padding: '1rem', color: '#64748b', fontWeight: '600' }}>Categoría</th>
                            <th style={{ padding: '1rem', color: '#64748b', fontWeight: '600' }}>Fecha</th>
                            <th style={{ padding: '1rem', color: '#64748b', fontWeight: '600' }}>Estado</th>
                            <th style={{ padding: '1rem', color: '#64748b', fontWeight: '600' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_NEWS.map((news) => (
                            <tr key={news.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                <td style={{ padding: '1rem', maxWidth: '300px' }}>
                                    <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{news.title}</div>
                                    <div style={{ fontSize: '0.875rem', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{news.excerpt}</div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700' }}>
                                        {news.category}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#64748b' }}>{news.date}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{ background: '#dcfce7', color: '#166534', padding: '0.25rem 0.5rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '600' }}>
                                        Publicado
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button style={{ padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', background: 'white', cursor: 'pointer' }} aria-label="Editar">✏️</button>
                                        <button style={{ padding: '0.5rem', border: '1px solid #fca5a5', borderRadius: '4px', background: '#fef2f2', color: '#dc2626', cursor: 'pointer' }} aria-label="Eliminar">🗑️</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
