import axios from 'axios';

// URL base del backend
const API_BASE_URL = 'http://localhost:3000';

// Instancia de axios con configuración base
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 segundos de timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Servicio para interactuar con la API de libros
 */
export const booksAPI = {
  /**
   * Obtiene todos los libros con término de búsqueda opcional
   * @param {string} query - Término de búsqueda (por defecto "javascript")
   * @returns {Promise} Lista de libros normalizados
   */
  getBooks: async (query = 'javascript') => {
    try {
      const response = await api.get('/books', {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener libros:', error);
      throw error;
    }
  },

  /**
   * Busca libros por término de búsqueda
   * @param {string} query - Término de búsqueda
   * @returns {Promise} Lista de libros encontrados (formato raw de Google Books)
   */
  searchBooks: async (query) => {
    try {
      const response = await api.get('/books/search', {
        params: { q: query }
      });
      // Normaliza los datos al mismo formato que getBooks
      return response.data.map(item => ({
        id: item.id,
        title: item.volumeInfo?.title || "Sin título",
        authors: item.volumeInfo?.authors || ["Desconocido"],
        description: item.volumeInfo?.description || "",
        thumbnail: item.volumeInfo?.imageLinks?.thumbnail || "",
        publishedDate: item.volumeInfo?.publishedDate || "",
        categories: item.volumeInfo?.categories || [],
        pageCount: item.volumeInfo?.pageCount || null,
        publisher: item.volumeInfo?.publisher || "",
        language: item.volumeInfo?.language || "",
        previewLink: item.volumeInfo?.previewLink || "",
        infoLink: item.volumeInfo?.infoLink || "",
        averageRating: item.volumeInfo?.averageRating || null,
        ratingsCount: item.volumeInfo?.ratingsCount || null,
      }));
    } catch (error) {
      console.error('Error al buscar libros:', error);
      throw error;
    }
  },

  /**
   * Obtiene un libro específico por ID
   * @param {string} id - ID del libro
   * @returns {Promise} Datos del libro
   */
  getBookById: async (id) => {
    try {
      const response = await api.get(`/books/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener libro:', error);
      throw error;
    }
  },

  /**
   * Obtiene las categorías disponibles
   * @param {string} query - Término para buscar categorías
   * @returns {Promise} Lista de categorías únicas
   */
  getCategories: async (query = 'javascript') => {
    try {
      const response = await api.get('/categories', {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      throw error;
    }
  }
};

export default api;