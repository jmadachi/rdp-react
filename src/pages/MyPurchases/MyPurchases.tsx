import { useState } from 'react';
import type { ReactNode } from 'react';
import { usePurchase } from '../../context/PurchaseContext';
import { useNavigate } from 'react-router-dom';
import styles from './MyPurchases.module.css';


export default function MyPurchases() {
    const { purchases, addPurchase, clearPurchases, removePurchase } = usePurchase();
    const [successMessage, setSuccessMessage] = useState<ReactNode>('');
    const navigate = useNavigate();

    const total = purchases.reduce(
        (sum, item) => sum + item.book.price * item.quantity,
        0
    );

    const handleBuy = () => {
        if (purchases.length === 0) return;

        const cantidad = purchases.reduce((acc, item) => acc + item.quantity, 0);

        clearPurchases();
        setSuccessMessage(
            <>
                ¡Gracias por su compra! Usted ha comprado{' '}
                <span className={styles.mypurchases__highlight}>
          {cantidad} libro{cantidad > 1 ? 's' : ''}
        </span>{' '}
                por un valor de{' '}
                <span className={styles.mypurchases__highlight}>
          {total.toLocaleString('es-CO', {
              style: 'currency',
              currency: 'COP'
          })}
        </span>.
            </>
        );
    };

    const closeModal = () => {
        setSuccessMessage('');
        navigate('/search');
    };

    return (
        <div className={styles.mypurchases}>
            <h2 className={styles.mypurchases__title}>Carrito de Compras</h2>

            {purchases.length === 0 && !successMessage && (
                <p>No has agregado libros al carrito aún.</p>
            )}

            {purchases.length > 0 && (
                <>
                    <table className={styles.mypurchases__table}>
                        <thead>
                        <tr>
                            <th>Carátula</th>
                            <th>Título</th>
                            <th>Autor</th>
                            <th>Cantidad</th>
                            <th>Unitario</th>
                            <th>Subtotal</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {purchases.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <img
                                        src={`/${item.book.cover}`}
                                        alt={item.book.title}
                                        className={styles.mypurchases__cover}
                                    />
                                </td>
                                <td>{item.book.title}</td>
                                <td>{item.book.author}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    {item.book.price.toLocaleString('es-CO', {
                                        style: 'currency',
                                        currency: 'COP'
                                    })}
                                </td>
                                <td>
                                    {(item.book.price * item.quantity).toLocaleString('es-CO', {
                                        style: 'currency',
                                        currency: 'COP'
                                    })}
                                </td>
                                <td className={styles.mypurchases__actions}>
                                    <div className={styles.mypurchases__actionsWrapper}>
                                        <button
                                            className={styles.mypurchases__actionButton}
                                            onClick={() => removePurchase(item.book.id)}
                                            title="Quitar uno"
                                        >
                                            ➖
                                        </button>
                                        <button
                                            className={styles.mypurchases__actionButton}
                                            onClick={() => addPurchase(item.book)}
                                            title="Agregar uno"
                                        >
                                            ➕
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className={styles.mypurchases__total}>
                        <span>Total:</span>
                        <strong className={styles.mypurchases__totalAmount}>
                            {total.toLocaleString('es-CO', {
                                style: 'currency',
                                currency: 'COP'
                            })}
                        </strong>
                    </div>

                    <button onClick={handleBuy} className={styles.mypurchases__buyButton}>
                        Finalizar compra
                    </button>
                </>
            )}

            {successMessage && (
                <div className={styles.mypurchases__modal}>
                    <p>{successMessage}</p>
                    <button className={styles.mypurchases__modalButton} onClick={closeModal}>
                        Aceptar
                    </button>
                </div>
            )}
        </div>
    );
}
