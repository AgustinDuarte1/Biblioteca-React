import express from 'express';
import cors from 'cors';
import booksRoutes from './routes/books.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Logging middleware (opcional pero útil)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Rutas
app.use('/', booksRoutes); // Monta las rutas en la raíz

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Biblioteca Digital',
    endpoints: [
      'GET /books?q=término',
      'GET /books/search?q=término',
      'GET /books/:id',
      'GET /categories?q=término'
    ]
  });
});

// Manejador de errores 404
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada',
    path: req.url,
    method: req.method
  });
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: err.message 
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 API de libros lista para usar`);
});