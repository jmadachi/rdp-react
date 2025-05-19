import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

export default function Layout() {
    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <nav className={styles.navbar}>
                    <div className={styles.logo}>
                        <img src="/rdp.svg" alt="Relatos de Papel" />
                        <span className={styles.logo__text}>Relatos de Papel</span>
                    </div>
                    <div className={styles.navRight}>
                        <Link to="/">Inicio</Link>
                        <Link to="/search">Comprar</Link>
                        <Link to="/MyPurchases">Carrito</Link>
                    </div>
                </nav>
            </header>

            <main className={styles.main}><Outlet/></main>

            <footer className={styles.footer}>
                <p>&copy; 2025 - Todos los derechos reservados</p>
            </footer>
        </div>
    );
}
