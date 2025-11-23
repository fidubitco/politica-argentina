'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Plus, Search } from 'lucide-react';
import styles from './page.module.css';

export default function AdminNewsPage() {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const res = await fetch('/api/articles');
            const data = await res.json();
            setArticles(data.articles || []);
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('¿Estás seguro de eliminar esta noticia?')) {
            try {
                await fetch(`/api/articles/${id}`, { method: 'DELETE' });
                fetchArticles(); // Refresh list
            } catch (error) {
                console.error('Error deleting article:', error);
            }
        }
    };

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-8 text-center">Cargando noticias...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Gestión de Noticias</h1>
                <Link href="/admin/editor" className={styles.createBtn}>
                    <Plus size={20} />
                    Nueva Noticia
                </Link>
            </div>

            <div className={styles.searchBar}>
                <Search size={20} className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Buscar noticias..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Categoría</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredArticles.map((article) => (
                            <tr key={article.id}>
                                <td className={styles.titleCell}>{article.title}</td>
                                <td>
                                    <span className={styles.categoryBadge}>{article.category.name}</span>
                                </td>
                                <td>{new Date(article.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <span className={`${styles.statusBadge} ${article.published ? styles.published : styles.draft}`}>
                                        {article.published ? 'Publicado' : 'Borrador'}
                                    </span>
                                </td>
                                <td className={styles.actionsCell}>
                                    <Link href={`/admin/editor?id=${article.id}`} className={styles.actionBtn} title="Editar">
                                        <Edit size={18} />
                                    </Link>
                                    <button onClick={() => handleDelete(article.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Eliminar">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
