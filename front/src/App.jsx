import { useBooks } from './context/BooksContext';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import BookCard from './components/BookCard';
import BookModal from './components/BookModal';
import LoadingSpinner from './components/LoadingSpinner';

/**
 * Componente principal de la aplicación
 */
function App() {
  const { filteredBooks, loading, error } = useBooks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            {/* Icono de libro */}
            <svg 
              className="w-10 h-10 text-blue-600" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
            </svg>
            <h1 className="text-4xl font-bold text-gray-900">
              Biblioteca Digital
            </h1>
          </div>
          <p className="text-center text-gray-600 text-sm">
            Descubre miles de libros de Google Books
          </p>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Barra de búsqueda */}
        <SearchBar />

        {/* Panel de filtros */}
        <FilterPanel />

        {/* Mensaje de error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <svg 
              className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h3 className="text-red-800 font-semibold">Error al cargar libros</h3>
              <p className="text-red-700 text-sm mt-1">{error}</p>
              <p className="text-red-600 text-xs mt-2">
                Asegúrate de que el backend esté corriendo en http://localhost:3000
              </p>
            </div>
          </div>
        )}

        {/* Loading spinner */}
        {loading && <LoadingSpinner />}

        {/* Lista de libros */}
        {!loading && !error && (
          <>
            {filteredBooks.length > 0 ? (
              <div className="space-y-4">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <svg 
                  className="w-24 h-24 text-gray-300 mx-auto mb-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  No se encontraron libros
                </h3>
                <p className="text-gray-500">
                  Intenta ajustar tus filtros o realizar una búsqueda diferente
                </p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Modal de detalles del libro */}
      <BookModal />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 text-sm">
            Datos proporcionados por{' '}
            <a 
              href="https://books.google.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Google Books API
            </a>
          </p>
          <p className="text-center text-gray-500 text-xs mt-2">
            © 2024 Biblioteca Digital - Hecho con React + Vite + Tailwind
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;