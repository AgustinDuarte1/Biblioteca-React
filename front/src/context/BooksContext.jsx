import { createContext, useContext, useState, useEffect } from 'react';
import { booksAPI } from '../services/api';

/**
 * Context para manejar el estado global de los libros
 */
const BooksContext = createContext();

/**
 * Hook personalizado para usar el contexto de libros
 */
export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error('useBooks debe ser usado dentro de BooksProvider');
  }
  return context;
};

/**
 * Provider que envuelve la aplicación y provee el estado global
 */
export const BooksProvider = ({ children }) => {
  // Estado para los libros
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estado para los filtros
  const [filters, setFilters] = useState({
    searchTerm: '',
    author: '',
    category: '',
  });

  // Estado para el modal
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Carga inicial de libros
   */
  useEffect(() => {
    fetchBooks();
  }, []);

  /**
   * Aplica filtros cuando cambian
   */
  useEffect(() => {
    applyFilters();
  }, [books, filters]);

  /**
   * Obtiene los libros del backend
   */
  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await booksAPI.getBooks();
      setBooks(data);
      setFilteredBooks(data);
    } catch (err) {
      setError('Error al cargar los libros. Por favor, intenta nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Busca libros en la API
   */
  const searchBooks = async (query) => {
    if (!query.trim()) {
      setFilteredBooks(books);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await booksAPI.searchBooks(query);
      setFilteredBooks(data);
    } catch (err) {
      setError('Error al buscar libros.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Aplica filtros locales a los libros
   */
  const applyFilters = () => {
    let result = [...books];

    // Filtro por término de búsqueda
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(book =>
        book.title?.toLowerCase().includes(term) ||
        book.authors?.some(author => author.toLowerCase().includes(term)) ||
        book.description?.toLowerCase().includes(term)
      );
    }

    // Filtro por autor
    if (filters.author) {
      result = result.filter(book =>
        book.authors?.some(author =>
          author.toLowerCase().includes(filters.author.toLowerCase())
        )
      );
    }

    // Filtro por categoría
    if (filters.category) {
      result = result.filter(book =>
        book.categories?.some(cat =>
          cat.toLowerCase().includes(filters.category.toLowerCase())
        )
      );
    }

    setFilteredBooks(result);
  };

  /**
   * Actualiza los filtros
   */
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  /**
   * Limpia todos los filtros
   */
  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      author: '',
      category: '',
    });
  };

  /**
   * Abre el modal con un libro seleccionado
   */
  const openModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  /**
   * Cierra el modal
   */
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBook(null), 300); // Espera a que termine la animación
  };

  // Valor del contexto que se provee
  const value = {
    books,
    filteredBooks,
    loading,
    error,
    filters,
    selectedBook,
    isModalOpen,
    fetchBooks,
    searchBooks,
    updateFilters,
    clearFilters,
    openModal,
    closeModal,
  };

  return (
    <BooksContext.Provider value={value}>
      {children}
    </BooksContext.Provider>
  );
};