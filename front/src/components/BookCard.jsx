import { useBooks } from '../context/BooksContext';

/**
 * Componente de tarjeta de libro
 * Muestra la información básica del libro en formato de tarjeta
 */
const BookCard = ({ book }) => {
  const { openModal } = useBooks();

  // Imagen por defecto si no hay portada
  const defaultImage = 'https://via.placeholder.com/128x192/e5e7eb/6b7280?text=Sin+Portada';

  /**
   * Maneja el clic en la tarjeta para abrir el modal
   */
  const handleClick = () => {
    openModal(book);
  };

  /**
   * Formatea la fecha de publicación
   */
  const formatDate = (date) => {
    if (!date) return 'Fecha desconocida';
    const year = new Date(date).getFullYear();
    return year;
  };

  /**
   * Trunca el texto a un número máximo de caracteres
   */
  const truncateText = (text, maxLength) => {
    if (!text) return 'Sin descripción disponible';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 cursor-pointer hover:scale-[1.02] border border-gray-100"
    >
      <div className="flex flex-col sm:flex-row gap-5">
        {/* Portada del libro */}
        <div className="flex-shrink-0 w-full sm:w-32">
          <img
            src={book.thumbnail || defaultImage}
            alt={book.title}
            className="w-full h-48 sm:h-48 object-cover rounded-lg shadow-md"
            onError={(e) => {
              e.target.src = defaultImage;
            }}
          />
        </div>

        {/* Información del libro */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          {/* Título */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
              {book.title}
            </h3>

            {/* Autores */}
            {book.authors && book.authors.length > 0 && (
              <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                </svg>
                <span className="font-medium">{book.authors.join(', ')}</span>
              </p>
            )}

            {/* Descripción truncada */}
            <p className="text-sm text-gray-700 leading-relaxed">
              {truncateText(book.description, 180)}
            </p>
          </div>

          {/* Footer con metadata */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-gray-100">
            {/* Fecha de publicación */}
            {book.publishedDate && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                </svg>
                {formatDate(book.publishedDate)}
              </span>
            )}

            {/* Primera categoría */}
            {book.categories && book.categories.length > 0 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                </svg>
                {book.categories[0]}
              </span>
            )}

            {/* Número de páginas */}
            {book.pageCount && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                </svg>
                {book.pageCount} páginas
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;