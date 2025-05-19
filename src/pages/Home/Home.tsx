import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/search');
        }, 5000);
        return () => clearTimeout(timer);
    }, [navigate]);

    const handleSkip = () => {
        navigate('/search');
    };

    return (
        <div className={styles.home}>
            <h1 className={styles.home__title}>Bienvenido a Relatos de Papel</h1>
            <p className={styles.home__description}>
                Tu librería en línea donde encontrarás las mejores historias.
            </p>
            <button onClick={handleSkip} className={styles.home__button}>
                Entrar ahora
            </button>
        </div>
    );
}
