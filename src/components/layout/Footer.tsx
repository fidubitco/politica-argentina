import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <h3>PoliticaArgentina</h3>
                        <p>Periodismo independiente y análisis profundo sobre la realidad política y social de la República Argentina.</p>
                    </div>

                    <div className={styles.column}>
                        <h4>Secciones</h4>
                        <ul>
                            <li><Link href="/seccion/politica">Política</Link></li>
                            <li><Link href="/seccion/economia">Economía</Link></li>
                            <li><Link href="/seccion/sociedad">Sociedad</Link></li>
                            <li><Link href="/seccion/internacionales">Internacionales</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4>Institucional</h4>
                        <ul>
                            <li><Link href="/sobre-nosotros">Sobre Nosotros</Link></li>
                            <li><Link href="/contacto">Contacto</Link></li>
                            <li><Link href="/publicidad">Publicidad</Link></li>
                            <li><Link href="/terminos">Términos y Condiciones</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4>Síguenos</h4>
                        <ul>
                            <li><a href="#">Twitter / X</a></li>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Instagram</a></li>
                            <li><a href="#">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} Politica Argentina. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
