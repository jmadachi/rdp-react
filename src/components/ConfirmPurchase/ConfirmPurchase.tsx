import styles from './ConfirmPurchase.module.css';


interface ConfirmPurchaseProps {
    bookTitle: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmPurchase({ bookTitle, onConfirm, onCancel }: ConfirmPurchaseProps) {
    return (
        <div className={styles.backdrop} role="dialog" aria-modal="true" aria-labelledby="confirmPurchaseTitle">
            <div className={styles.confirmPurchase}>
                <p id="confirmPurchaseTitle" className={styles.confirmPurchase__message}>
                    Desea comprar el libro <strong>{bookTitle}</strong>?
                </p>
                <div className={styles.confirmPurchase__buttons}>
                    <button
                        className={`${styles.confirmPurchase__button} ${styles['confirmPurchase__button--yes']}`}
                        onClick={onConfirm}
                        type="button"
                    >
                        Sí
                    </button>
                    <button
                        className={`${styles.confirmPurchase__button} ${styles['confirmPurchase__button--no']}`}
                        onClick={onCancel}
                        type="button"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}

