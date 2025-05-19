import { useNavigate } from 'react-router-dom';
import type { Book } from '../../DTOs/Book';
import styles from './BookViewer.module.css';

type Props = {
    book: Book;
    onAddToCart: (book: Book) => void;
};

export default function BookViewer({ book, onAddToCart }: Props) {
    const navigate = useNavigate();

    const goToDetail = () => {
        navigate(`/book/${book.id}`);
    };

    return (
        <div className={styles.bookviewer}>
            <img
                src={book.cover}
                alt={book.title}
                className={styles.bookviewer__cover}
                onClick={goToDetail}
                style={{ cursor: 'pointer' }}
            />
            <div className={styles.bookviewer__info}>
                <h3 onClick={goToDetail} className={styles.bookviewer__title}>
                    {book.title}
                </h3>
                <p className={styles.bookviewer__author}>{book.author}</p>
                <div className={styles.bookviewer__footer}>
                    <span className={styles.bookviewer__price}>
                        {book.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                    </span>
                    <button
                        className={styles.bookviewer__button}
                        onClick={() => onAddToCart(book)}
                        title="Agregar al carrito"
                    >
                        🛒
                    </button>
                </div>
            </div>
        </div>
    );
}
