import { useState } from 'react';
import { useBooks } from '../context/Bookscontext';

/**
 * Barra de búsqueda de libros
 */
const SearchBar = () => {
  const { updateFilters, filters } = useBooks();
  const [localSearchTerm, setLocalSearchTerm] = useState(filters.searchTerm);

  /**
   * Maneja el cambio en el input de búsqueda
   */
  const handleChange = (e) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    // Actualiza el filtro en el contexto en tiempo real
    updateFilters({ searchTerm: value });
  };

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    updateFilters({ searchTerm: localSearchTerm });
  };

  /**
   * Limpia la búsqueda
   */
  const handleClear = () => {
    setLocalSearchTerm('');
    updateFilters({ searchTerm: '' });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        {/* Icono de búsqueda */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input de búsqueda */}
        <input
          type="text"
          value={localSearchTerm}
          onChange={handleChange}
          placeholder="Buscar por título, autor o descripción..."
          className="w-full pl-12 pr-24 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
        />

        {/* Botón de limpiar (solo visible cuando hay texto) */}
        {localSearchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-20 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Botón de buscar */}
        <button
          type="submit"
          className="absolute inset-y-0 right-0 px-6 bg-primary-600 text-white rounded-r-lg hover:bg-primary-700 transition-colors duration-200"
        >
          Buscar
        </button>
      </form>

      {/* Contador de resultados */}
      {filters.searchTerm && (
        <p className="mt-2 text-sm text-gray-600">
          Buscando: "<span className="font-semibold">{filters.searchTerm}</span>"
        </p>
      )}
    </div>
  );
};

export default SearchBar;