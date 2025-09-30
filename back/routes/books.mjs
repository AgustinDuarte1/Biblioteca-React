import express from 'express';
import { getBooks } from '../controllers/booksController.mjs';

const router = express.Router();

router.get('/', getBooks);

export default router;