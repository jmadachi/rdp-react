import { useState, useEffect } from 'react';
import type { Book } from '../../DTOs/Book';
import booksData from '../../Data/books.json';
import BookViewer from '../../components/BookViewer';
import ConfirmPurchase from '../../components/ConfirmPurchase';
import { usePurchase } from '../../context/PurchaseContext';
import styles from './Search.module.css';

export default function Search() {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState<Book[]>([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const { addPurchase } = usePurchase();

    useEffect(() => {
        setBooks(booksData);
    }, []);

    const filteredBooks = books.filter(
        (book) =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase())
    );

    const handleAddToCartClick = (book: Book) => {
        setSelectedBook(book);
        setShowConfirm(true);
    };

    const handleConfirm = () => {
        if (selectedBook) {
            addPurchase(selectedBook);
        }
        setShowConfirm(false);
    };

    const handleCancel = () => {
        setShowConfirm(false);
        setSelectedBook(null);
    };

    return (
        <div className={styles.search}>
            <div className={styles.search__header}>
                <h1 className={styles.search__title}>Buscar libros</h1>
                <input
                    type="text"
                    placeholder="Buscar por título o autor"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={styles.search__input}
                />
            </div>

            <div className={styles.search__bookList}>
                {filteredBooks.length === 0 ? (
                    <p className={styles.search__noResults}>No se encontraron libros.</p>
                ) : (
                    filteredBooks.map((book) => (
                        <BookViewer
                            key={book.id}
                            book={book}
                            onAddToCart={handleAddToCartClick}
                        />
                    ))
                )}
            </div>

            {showConfirm && selectedBook && (
                <ConfirmPurchase
                    bookTitle={selectedBook.title}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
}
