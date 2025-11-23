'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import styles from '@/app/admin/admin.module.css';

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className={styles.navLink}
            style={{
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: 'auto',
                color: '#ef4444'
            }}
        >
            <LogOut size={18} />
            Cerrar Sesión
        </button>
    );
}
