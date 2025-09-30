import express from 'express';
import * as booksController from '../controllers/books.controller.js';

const router = express.Router();

/**
 * Rutas para libros
 */

// GET /books - Obtener libros con búsqueda opcional
router.get('/books', booksController.getBooks);

// GET /books/search - Buscar libros (formato raw)
router.get('/books/search', booksController.searchBooks);

// GET /books/:id - Obtener un libro específico por ID
router.get('/books/:id', booksController.getBookById);

// GET /categories - Obtener categorías disponibles
router.get('/categories', booksController.getCategories);

export default router;