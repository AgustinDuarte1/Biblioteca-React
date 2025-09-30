import express from 'express';
import cors from 'cors';
import booksRouter from './routes/books.mjs';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use('/api/books', booksRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});