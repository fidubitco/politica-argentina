'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Image as ImageIcon, Loader2 } from 'lucide-react';
import styles from './page.module.css';

function EditorContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const articleId = searchParams.get('id');

    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        categoryId: '',
        image: '',
        published: false,
        featured: false
    });

    // Fetch categories and article data if editing
    useEffect(() => {
        const init = async () => {
            try {
                // Fetch categories
                const catRes = await fetch('/api/categories');
                const catData = await catRes.json();
                setCategories(catData);

                // If editing, fetch article
                if (articleId) {
                    const artRes = await fetch(`/api/articles/${articleId}`);
                    const artData = await artRes.json();
                    setFormData({
                        title: artData.title,
                        slug: artData.slug,
                        excerpt: artData.excerpt,
                        content: artData.content,
                        categoryId: artData.categoryId,
                        image: artData.image || '',
                        published: artData.published,
                        featured: artData.featured
                    });
                } else {
                    // Set default category if available
                    if (catData.length > 0) {
                        setFormData(prev => ({ ...prev, categoryId: catData[0].id }));
                    }
                }
            } catch (error) {
                console.error('Error initializing editor:', error);
            }
        };
        init();
    }, [articleId]);

    // Auto-generate slug from title
    useEffect(() => {
        if (!articleId && formData.title) {
            const slug = formData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            setFormData(prev => ({ ...prev, slug }));
        }
    }, [formData.title, articleId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                authorId: 'admin-id-placeholder' // API needs to handle this or we need to fetch it
            };

            const url = articleId ? `/api/articles/${articleId}` : '/api/articles';
            const method = articleId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Failed to save');

            router.push('/admin/noticias');
        } catch (error) {
            console.error('Error saving article:', error);
            alert('Error al guardar la noticia');
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            setFormData(prev => ({ ...prev, image: data.url }));
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error al subir imagen');
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <Link href="/admin/noticias" className={styles.backBtn}>
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className={styles.title}>{articleId ? 'Editar Noticia' : 'Nueva Noticia'}</h1>
                </div>
                <button onClick={handleSubmit} disabled={loading} className={styles.saveBtn}>
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    {loading ? 'Guardando...' : 'Guardar'}
                </button>
            </header>

            <div className={styles.grid}>
                <div className={styles.mainColumn}>
                    <div className={styles.card}>
                        <div className={styles.formGroup}>
                            <label>Título</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Título de la noticia"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Slug (URL)</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Copete (Resumen)</label>
                            <textarea
                                value={formData.excerpt}
                                onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                rows={3}
                                className={styles.textarea}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Contenido</label>
                            <textarea
                                value={formData.content}
                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                rows={15}
                                className={styles.textarea}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.sidebar}>
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Configuración</h3>

                        <div className={styles.formGroup}>
                            <label>Estado</label>
                            <select
                                value={formData.published ? 'published' : 'draft'}
                                onChange={e => setFormData({ ...formData, published: e.target.value === 'published' })}
                                className={styles.select}
                            >
                                <option value="draft">Borrador</option>
                                <option value="published">Publicado</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Categoría</label>
                            <select
                                value={formData.categoryId}
                                onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                                className={styles.select}
                            >
                                <option value="">Seleccionar...</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.checkboxGroup}>
                            <input
                                type="checkbox"
                                id="featured"
                                checked={formData.featured}
                                onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                            />
                            <label htmlFor="featured">Destacar en portada</label>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Imagen Principal</h3>
                        <div className={styles.imageUpload}>
                            {formData.image ? (
                                <div className={styles.preview}>
                                    <img src={formData.image} alt="Preview" />
                                    <button onClick={() => setFormData({ ...formData, image: '' })} className={styles.removeImg}>×</button>
                                </div>
                            ) : (
                                <label className={styles.uploadLabel}>
                                    <ImageIcon size={24} />
                                    <span>Subir Imagen</span>
                                    <input type="file" onChange={handleImageUpload} accept="image/*" hidden />
                                </label>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function EditorPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditorContent />
        </Suspense>
    )
}
