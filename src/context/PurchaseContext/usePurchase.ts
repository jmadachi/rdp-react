import { useContext } from 'react';
import { PurchaseContext } from './PurchaseContext';

export function usePurchase() {
    const context = useContext(PurchaseContext);
    if (!context) {
        throw new Error('usePurchase must be used within a PurchaseProvider');
    }
    return context;
}
