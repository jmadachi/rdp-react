import { usePurchase } from '../../context/PurchaseContext';
import styles from './PurchasesPage.module.css';

export default function PurchasesPage() {
    const { purchases } = usePurchase();

    const total = purchases.reduce((sum, book) => sum + book.price, 0);

    return (
        <div className={styles.purchases}>
            <h1 className={styles.purchases__title}>Mis Compras</h1>
            {purchases.length === 0 ? (
                <p className={styles.purchases__empty}>No has comprado ningún libro aún.</p>
            ) : (
                <>
                    <ul className={styles.purchases__list}>
                        {purchases.map((book, index) => (
                            <li key={index} className={styles.purchases__item}>
                                <img
                                    src={book.cover}
                                    alt={book.title}
                                    className={styles.purchases__cover}
                                />
                                <div className={styles.purchases__info}>
                                    <h2 className={styles.purchases__title}>{book.title}</h2>
                                    <p className={styles.purchases__author}>{book.author}</p>
                                    <p className={styles.purchases__price}>${book.price.toFixed(2)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.purchases__total}>
                        <span>Total:</span>
                        <strong>${total.toFixed(2)}</strong>
                    </div>
                </>
            )}
        </div>
    );
}
