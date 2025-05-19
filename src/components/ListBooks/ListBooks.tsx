import type { Book } from '../../DTOs/Book';
import { usePurchase } from '../../context/PurchaseContext';
import styles from './ListBooks.module.css';

interface ListBooksProps {
    books: Book[];
}

export default function ListBooks({ books }: ListBooksProps) {
    const { addPurchase } = usePurchase();

    function handlePurchase(book: Book): void {
        const confirmed = window.confirm(`¿Deseas comprar el libro "${book.title}"?`);
        if (confirmed) {
            addPurchase(book);
        }
    }

    return (
        <div className={styles['list-books']}>
            <h2 className={styles['list-books__title']}>Precios de Libros</h2>

            {books.length === 0 ? (
                <p className={styles['list-books__empty']}>No hay libros disponibles.</p>
            ) : (
                <ul className={styles['list-books__list']}>
                    {books.map((book) => (
                        <li key={book.id} className={styles['list-books__item']}>
                            <div className={styles['list-books__info']}>
                                <img
                                    src={book.cover}
                                    alt={book.title}
                                    className={styles['list-books__image']}
                                />
                                <strong>{book.title}</strong>
                                <span>{book.author}</span>
                                <span>${book.price}</span>
                            </div>
                            <button
                                onClick={() => handlePurchase(book)}
                                className={styles['list-books__button']}
                            >
                                Comprar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
