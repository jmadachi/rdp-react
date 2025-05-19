import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Book } from '../../DTOs/Book';
import booksData from '../../Data/books.json';
import styles from './BookDetail.module.css';
import { usePurchase } from '../../context/PurchaseContext';
import ConfirmPurchase from '../../components/ConfirmPurchase';

export default function BookDetail() {
    const { id } = useParams();
    const { addPurchase } = usePurchase();

    const [book, setBook] = useState<Book | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        const found = booksData.find(b => b.id === Number(id));
        setBook(found as Book | null);
    }, [id]);

    if (!book) {
        return <p className={styles.bookdetail__notfound}>Libro no encontrado</p>;
    }

    const handleConfirm = () => {
        addPurchase(book);
        setShowConfirm(false);
    };

    const handleCancel = () => {
        setShowConfirm(false);
    };

    return (
        <div className={styles.bookdetail}>
            <img
                src={`/${book.cover}`}
                alt={book.title}
                className={styles.bookdetail__image}
            />
            <div className={styles.bookdetail__info}>
                <h2 className={styles.bookdetail__title}>{book.title}</h2>
                <p className={styles.bookdetail__author}>{book.author}</p>
                <p className={styles.bookdetail__price}>
                    {book.price.toLocaleString('es-CO', {
                        style: 'currency',
                        currency: 'COP'
                    })}
                </p>

                <p><strong>ISBN:</strong> {book.isbn}</p>
                <p><strong>Género:</strong> {book.genre}</p>
                <p><strong>Editorial:</strong> {book.publisher}</p>
                <p><strong>Sinopsis:</strong> {book.synopsis}</p>

                <button
                    className={styles.bookdetail__button}
                    onClick={() => setShowConfirm(true)}
                    title="Agregar al carrito"
                >
                    🛒 Agregar al carrito
                </button>
            </div>

            {showConfirm && (
                <ConfirmPurchase
                    bookTitle={book.title}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
}
