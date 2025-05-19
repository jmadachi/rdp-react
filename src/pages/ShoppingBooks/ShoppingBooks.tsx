import ListBooks from '../../components/ListBooks';
import booksData from '../../Data/books.json';
import type { Book } from '../../DTOs/Book';

export default function ShoppingBooks() {
    return (
        <div style={{ padding: '20px', backgroundColor: '#1e272e', minHeight: '80vh', color: '#addac9' }}>
            <h1>Lista de Libros con Precios</h1>
            <ListBooks books={booksData as Book[]} />
        </div>
    );
}

