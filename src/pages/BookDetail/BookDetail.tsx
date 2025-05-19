import { useParams } from 'react-router-dom';
import books from '../../Data/books.json';
import type { Book } from '../../DTOs/Book';
import { usePurchase } from '../../context/PurchaseContext';
import styles from './BookDetail.module.css';

export default function BookDetail() {
    const { id } = useParams();
    const { addPurchase } = usePurchase();

    const book = (books as Book[]).find((b) => b.id.toString() === id);

    if (!book) {
        return <p className={styles.bookdetail__notfound}>Libro no encontrado</p>;
    }

    return (
        <div className={styles.bookdetail}>
            <img src={`/${book.cover}`} alt={book.title} className={styles.bookdetail__image} />
            <div className={styles.bookdetail__info}>
                <h1 className={styles.bookdetail__title}>{book.title}</h1>
                <p className={styles.bookdetail__author}>Autor: {book.author}</p>
                <p className={styles.bookdetail__price}>
                    {book.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                </p>
                <button
                    className={styles.bookdetail__button}
                    onClick={() => addPurchase(book)}
                    title="Agregar al carrito"
                >
                    🛒
                </button>
            </div>
        </div>
    );
}
