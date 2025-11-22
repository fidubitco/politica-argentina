'use client';

import { useState } from 'react';
import styles from '../admin.module.css';

export default function SeoTool() {
    const [text, setText] = useState('');
    const [keyword, setKeyword] = useState('');
    const [analysis, setAnalysis] = useState<any>(null);

    const analyze = () => {
        const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
        const keywordCount = keyword ? (text.match(new RegExp(keyword, 'gi')) || []).length : 0;
        const density = keyword && wordCount > 0 ? ((keywordCount / wordCount) * 100).toFixed(2) : 0;

        setAnalysis({
            wordCount,
            keywordCount,
            density,
            readability: wordCount > 300 ? 'Bueno' : 'Necesita más contenido',
            score: Math.min(100, (wordCount / 5) + (keywordCount * 10)) // Mock score logic
        });
    };

    return (
        <div>
            <header className={styles.header}>
                <h1 className={styles.title}>SEO Audit Tool</h1>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Palabra Clave Objetivo</label>
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '4px' }}
                            placeholder="Ej: elecciones 2025"
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Contenido del Artículo</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            style={{ width: '100%', height: '400px', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '4px', fontFamily: 'monospace' }}
                            placeholder="Pega aquí el contenido de tu noticia..."
                        />
                    </div>

                    <button
                        onClick={analyze}
                        className="btn btn-primary"
                        style={{ background: 'var(--primary)', color: 'white', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Analizar Contenido
                    </button>
                </div>

                <div>
                    {analysis && (
                        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', position: 'sticky', top: '2rem' }}>
                            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>Resultados</h3>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <span style={{ display: 'block', fontSize: '0.875rem', color: '#64748b' }}>Puntuación SEO</span>
                                <span style={{ fontSize: '2.5rem', fontWeight: '700', color: analysis.score > 80 ? '#16a34a' : '#ca8a04' }}>
                                    {Math.round(analysis.score)}/100
                                </span>
                            </div>

                            <ul style={{ listStyle: 'none' }}>
                                <li style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Palabras</span>
                                    <strong>{analysis.wordCount}</strong>
                                </li>
                                <li style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Densidad de KW</span>
                                    <strong>{analysis.density}%</strong>
                                </li>
                                <li style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Legibilidad</span>
                                    <strong>{analysis.readability}</strong>
                                </li>
                            </ul>

                            <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8fafc', borderRadius: '4px' }}>
                                <h4 style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>Recomendaciones</h4>
                                <ul style={{ fontSize: '0.875rem', paddingLeft: '1rem', color: '#475569' }}>
                                    {analysis.wordCount < 300 && <li>• El contenido es muy corto. Intenta llegar a 300 palabras.</li>}
                                    {Number(analysis.density) > 2.5 && <li>• Cuidado con el keyword stuffing. Reduce la densidad.</li>}
                                    {Number(analysis.density) < 0.5 && <li>• Usa más la palabra clave en el texto.</li>}
                                    {analysis.wordCount >= 300 && Number(analysis.density) >= 0.5 && Number(analysis.density) <= 2.5 && <li>• ¡Buen trabajo! El contenido parece optimizado.</li>}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
