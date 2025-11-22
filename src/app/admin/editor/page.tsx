'use client';

import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

export default function EditorPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const savedDraft = localStorage.getItem('news_draft');
        if (savedDraft) {
            const { title, content } = JSON.parse(savedDraft);
            setTitle(title);
            setContent(content);
        }
    }, []);

    const saveDraft = () => {
        localStorage.setItem('news_draft', JSON.stringify({ title, content }));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div>
            <header className={styles.header}>
                <h1 className={styles.title}>Nueva Noticia</h1>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {saved && <span style={{ color: '#16a34a', fontSize: '0.875rem' }}>Borrador guardado</span>}
                    <button
                        onClick={saveDraft}
                        style={{ padding: '0.75rem 1.5rem', border: '1px solid #cbd5e1', background: 'white', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Guardar Borrador
                    </button>
                    <button style={{ padding: '0.75rem 1.5rem', border: 'none', background: 'var(--primary)', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>Publicar</button>
                </div>
            </header>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Título de la noticia"
                        style={{ width: '100%', fontSize: '2rem', padding: '0.5rem', border: 'none', borderBottom: '1px solid #e2e8f0', outline: 'none', fontFamily: 'var(--font-heading)' }}
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <textarea
                        placeholder="Copete / Resumen"
                        style={{ width: '100%', height: '100px', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '4px', resize: 'none', fontSize: '1.1rem' }}
                    />
                </div>

                <div style={{ marginBottom: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '4px', minHeight: '400px', padding: '1rem' }}>
                    <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
                        <button style={{ padding: '0.25rem 0.5rem', cursor: 'pointer' }}>B</button>
                        <button style={{ padding: '0.25rem 0.5rem', cursor: 'pointer' }}>I</button>
                        <button style={{ padding: '0.25rem 0.5rem', cursor: 'pointer' }}>H2</button>
                        <button style={{ padding: '0.25rem 0.5rem', cursor: 'pointer' }}>Link</button>
                        <button style={{ padding: '0.25rem 0.5rem', cursor: 'pointer' }}>Imagen</button>
                    </div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Escribe tu noticia aquí..."
                        style={{ width: '100%', height: '350px', border: 'none', outline: 'none', resize: 'none', fontSize: '1rem', lineHeight: '1.6' }}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Categoría</label>
                        <select style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                            <option>Política</option>
                            <option>Economía</option>
                            <option>Sociedad</option>
                            <option>Internacionales</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Fecha de Publicación</label>
                        <input type="datetime-local" style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '4px' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
