'use client';

import styles from './admin.module.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
    { name: 'Lun', visitas: 4000 },
    { name: 'Mar', visitas: 3000 },
    { name: 'Mie', visitas: 2000 },
    { name: 'Jue', visitas: 2780 },
    { name: 'Vie', visitas: 1890 },
    { name: 'Sab', visitas: 2390 },
    { name: 'Dom', visitas: 3490 },
];

const categoryData = [
    { name: 'Política', cantidad: 45 },
    { name: 'Economía', cantidad: 30 },
    { name: 'Sociedad', cantidad: 25 },
    { name: 'Mundo', cantidad: 15 },
];

export default function AdminDashboard() {
    return (
        <div>
            <header className={styles.header}>
                <h1 className={styles.title}>Dashboard</h1>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
                <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Visitas Totales</h3>
                    <p style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a' }}>1,234,567</p>
                    <span style={{ color: '#16a34a', fontSize: '0.875rem' }}>+12% vs mes anterior</span>
                </div>

                <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Artículos Publicados</h3>
                    <p style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a' }}>142</p>
                    <span style={{ color: '#16a34a', fontSize: '0.875rem' }}>+5 esta semana</span>
                </div>

                <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Tiempo en Sitio</h3>
                    <p style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a' }}>4m 12s</p>
                    <span style={{ color: '#dc2626', fontSize: '0.875rem' }}>-2% vs mes anterior</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', height: '400px' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Visitas Semanales</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="visitas" stroke="#0f172a" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', height: '400px' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Por Categoría</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={categoryData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="cantidad" fill="#b45309" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Actividad Reciente</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                            <th style={{ padding: '1rem', color: '#64748b' }}>Artículo</th>
                            <th style={{ padding: '1rem', color: '#64748b' }}>Autor</th>
                            <th style={{ padding: '1rem', color: '#64748b' }}>Estado</th>
                            <th style={{ padding: '1rem', color: '#64748b' }}>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: '1rem' }}>Elecciones Legislativas 2025...</td>
                            <td style={{ padding: '1rem' }}>Juan Pérez</td>
                            <td style={{ padding: '1rem' }}><span style={{ background: '#dcfce7', color: '#166534', padding: '0.25rem 0.5rem', borderRadius: '999px', fontSize: '0.75rem' }}>Publicado</span></td>
                            <td style={{ padding: '1rem' }}>Hace 2 horas</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '1rem' }}>El PBI crece un 3%...</td>
                            <td style={{ padding: '1rem' }}>María González</td>
                            <td style={{ padding: '1rem' }}><span style={{ background: '#dcfce7', color: '#166534', padding: '0.25rem 0.5rem', borderRadius: '999px', fontSize: '0.75rem' }}>Publicado</span></td>
                            <td style={{ padding: '1rem' }}>Ayer</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div >
    );
}
