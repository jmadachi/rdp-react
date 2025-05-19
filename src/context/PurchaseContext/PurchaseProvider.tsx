import { useState } from 'react';
import type { ReactNode } from 'react';
import { PurchaseContext, type PurchaseItem } from './PurchaseContext';
import type { Book } from '../../DTOs/Book';

export function PurchaseProvider({ children }: { children: ReactNode }) {
    const [purchases, setPurchases] = useState<PurchaseItem[]>([]);

    function addPurchase(book: Book): void {
        setPurchases(prev => {
            const index = prev.findIndex(item => item.book.id === book.id);
            if (index >= 0) {
                const updated = [...prev];
                updated[index] = {
                    ...updated[index],
                    quantity: updated[index].quantity + 1
                };
                return updated;
            } else {
                return [...prev, { book, quantity: 1 }];
            }
        });
    }

    function removePurchase(bookId: number): void {
        setPurchases(prev => {
            const index = prev.findIndex(item => item.book.id === bookId);
            if (index >= 0) {
                const updated = [...prev];
                if (updated[index].quantity > 1) {
                    updated[index] = {
                        ...updated[index],
                        quantity: updated[index].quantity - 1
                    };
                } else {
                    updated.splice(index, 1);
                }
                return updated;
            }
            return prev;
        });
    }

    function clearPurchases(): void {
        setPurchases([]);
    }

    return (
        <PurchaseContext.Provider value={{ purchases, addPurchase, removePurchase, clearPurchases }}>
            {children}
        </PurchaseContext.Provider>
    );
}
