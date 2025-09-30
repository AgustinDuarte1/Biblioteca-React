import { useEffect } from 'react';
import { useBooks } from '../context/BooksContext';

/**
 * Modal para mostrar los detalles completos de un libro
 */
const BookModal = () => {
  const { selectedBook, isModalOpen, closeModal } = useBooks();

  // Imagen por defecto
  const defaultImage = 'https://via.placeholder.com/300x450/e5e7eb/6b7280?text=Sin+Portada';

  /**
   * Cierra el modal al presionar la tecla Escape
   */
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      // Bloquea el scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, closeModal]);

  /**
   * Formatea la fecha de publicación
   */
  const formatDate = (date) => {
    if (!date) return 'Fecha desconocida';
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // No renderiza nada si no hay libro seleccionado
  if (!selectedBook) return null;

  return (
    <>
      {/* Overlay oscuro de fondo */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isModalOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeModal}
      />

      {/* Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center p-4 z-50 transition-all duration-300 ${
          isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
            isModalOpen ? 'scale-100' : 'scale-95'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header del modal con botón de cerrar */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl z-10">
            <h2 className="text-2xl font-bold text-gray-900 pr-8 line-clamp-2">
              {selectedBook.title}
            </h2>
            <button
              onClick={closeModal}
              className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Cerrar modal"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Contenido del modal */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Portada grande */}
              <div className="flex-shrink-0 w-full md:w-64">
                <img
                  src={selectedBook.thumbnail || defaultImage}
                  alt={selectedBook.title}
                  className="w-full h-auto rounded-xl shadow-lg"
                  onError={(e) => {
                    e.target.src = defaultImage;
                  }}
                />

                {/* Enlaces externos */}
                <div className="mt-4 space-y-2">
                  {selectedBook.previewLink && (
                    <a
                      href={selectedBook.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Vista previa
                    </a>
                  )}
                  {selectedBook.infoLink && (
                    <a
                      href={selectedBook.infoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Más información
                    </a>
                  )}
                </div>
              </div>

              {/* Información detallada */}
              <div className="flex-1">
                {/* Autores */}
                {selectedBook.authors && selectedBook.authors.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                      </svg>
                      {selectedBook.authors.length > 1 ? 'Autores' : 'Autor'}
                    </h3>
                    <p className="text-lg text-gray-800">{selectedBook.authors.join(', ')}</p>
                  </div>
                )}

                {/* Metadata */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedBook.publishedDate && (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                      </svg>
                      {formatDate(selectedBook.publishedDate)}
                    </span>
                  )}
                  {selectedBook.pageCount && (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                      </svg>
                      {selectedBook.pageCount} páginas
                    </span>
                  )}
                  {selectedBook.language && (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd"/>
                      </svg>
                      {selectedBook.language.toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Categorías */}
                {selectedBook.categories && selectedBook.categories.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Categorías</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedBook.categories.map((category, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Editor */}
                {selectedBook.publisher && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Editorial</h3>
                    <p className="text-gray-800">{selectedBook.publisher}</p>
                  </div>
                )}

                {/* ISBN */}
                {selectedBook.isbn && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">ISBN</h3>
                    <p className="text-gray-800 font-mono text-sm">{selectedBook.isbn}</p>
                  </div>
                )}

                {/* Descripción */}
                {selectedBook.description && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Descripción</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {selectedBook.description}
                    </p>
                  </div>
                )}

                {/* Rating si existe */}
                {selectedBook.averageRating && (
                  <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-amber-600">
                        {selectedBook.averageRating}
                      </span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.round(selectedBook.averageRating)
                                ? 'text-amber-400'
                                : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                        ))}
                      </div>
                      {selectedBook.ratingsCount && (
                        <span className="text-sm text-gray-600">
                          ({selectedBook.ratingsCount} reseñas)
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookModal;