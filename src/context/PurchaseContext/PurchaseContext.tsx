import { createContext } from 'react';
import type { Book } from '../../DTOs/Book';

export type PurchaseItem = {
    book: Book;
    quantity: number;
};

export type PurchaseContextType = {
    purchases: PurchaseItem[];
    addPurchase: (book: Book) => void;
    removePurchase: (bookId: number) => void;
    clearPurchases: () => void;
};

export const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined);
