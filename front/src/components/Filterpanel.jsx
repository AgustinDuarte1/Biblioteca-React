import { useState, useEffect } from 'react';
import { useBooks } from '../context/Bookscontext';

/**
 * Panel de filtros avanzados
 */
const FilterPanel = () => {
  const { books, filters, updateFilters, clearFilters, filteredBooks } = useBooks();
  const [isOpen, setIsOpen] = useState(false);
  
  // Extrae autores y categorías únicos de los libros
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Extrae autores únicos
    const uniqueAuthors = [...new Set(
      books.flatMap(book => book.authors || [])
    )].sort();

    // Extrae categorías únicas
    const uniqueCategories = [...new Set(
      books.flatMap(book => book.categories || [])
    )].sort();

    setAuthors(uniqueAuthors);
    setCategories(uniqueCategories);
  }, [books]);

  /**
   * Maneja el cambio de filtro de autor
   */
  const handleAuthorChange = (e) => {
    updateFilters({ author: e.target.value });
  };

  /**
   * Maneja el cambio de filtro de categoría
   */
  const handleCategoryChange = (e) => {
    updateFilters({ category: e.target.value });
  };

  /**
   * Limpia todos los filtros
   */
  const handleClearFilters = () => {
    clearFilters();
  };

  /**
   * Cuenta los filtros activos
   */
  const activeFiltersCount = [
    filters.author,
    filters.category,
  ].filter(Boolean).length;

  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      {/* Botón para mostrar/ocultar filtros en móvil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-sm border border-gray-200 mb-4"
      >
        <span className="font-medium text-gray-700">
          Filtros avanzados
          {activeFiltersCount > 0 && (
            <span className="ml-2 px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </span>
        <svg
          className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Panel de filtros */}
      <div className={`
        bg-white rounded-lg shadow-sm border border-gray-200 p-4
        ${isOpen ? 'block' : 'hidden'} md:block
      `}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filtro por autor */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
              Autor
            </label>
            <select
              id="author"
              value={filters.author}
              onChange={handleAuthorChange}
              className="input-field"
            >
              <option value="">Todos los autores</option>
              {authors.map((author, index) => (
                <option key={index} value={author}>
                  {author}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por categoría */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <select
              id="category"
              value={filters.category}
              onChange={handleCategoryChange}
              className="input-field"
            >
              <option value="">Todas las categorías</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Botón de limpiar filtros */}
          <div className="flex items-end">
            <button
              onClick={handleClearFilters}
              disabled={activeFiltersCount === 0}
              className={`
                w-full px-4 py-2 rounded-lg font-medium transition-colors duration-200
                ${activeFiltersCount > 0
                  ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              Limpiar filtros
            </button>
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Mostrando <span className="font-semibold">{filteredBooks.length}</span> de{' '}
            <span className="font-semibold">{books.length}</span> libros
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;