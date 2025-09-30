/**
 * Controlador de libros
 * Maneja las peticiones relacionadas con libros desde Google Books API
 */

// Obtener libros desde Google Books API
export const getBooks = async (req, res) => {
  try {
    const { q = "javascript" } = req.query;

    console.log(`Buscando libros con término: ${q}`);

    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&maxResults=40`
    );

    if (!response.ok) {
      throw new Error(`Google Books API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Normalización: mapeo de los datos a un formato consistente
    const books = (data.items || []).map(item => ({
      id: item.id,
      title: item.volumeInfo.title || "Sin título",
      authors: item.volumeInfo.authors || ["Desconocido"],
      description: item.volumeInfo.description || "Sin descripción disponible",
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
      publishedDate: item.volumeInfo.publishedDate || "",
      categories: item.volumeInfo.categories || [],
      pageCount: item.volumeInfo.pageCount || null,
      publisher: item.volumeInfo.publisher || "",
      language: item.volumeInfo.language || "",
      previewLink: item.volumeInfo.previewLink || "",
      infoLink: item.volumeInfo.infoLink || "",
      averageRating: item.volumeInfo.averageRating || null,
      ratingsCount: item.volumeInfo.ratingsCount || null,
      isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier || "",
    }));

    console.log(`✅ Se encontraron ${books.length} libros`);

    // Envío al frontend
    res.json(books);
  } catch (error) {
    console.error("❌ Error al obtener libros:", error.message);
    res.status(500).json({ 
      error: "Error al obtener libros",
      message: error.message 
    });
  }
};

// Buscar libros por término
export const searchBooks = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ 
        error: "Falta el parámetro de búsqueda 'q'" 
      });
    }

    console.log(`Buscando libros con término: ${q}`);

    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&maxResults=40`
    );

    if (!response.ok) {
      throw new Error(`Google Books API error: ${response.status}`);
    }

    const data = await response.json();

    console.log(`✅ Se encontraron ${data.items?.length || 0} libros`);

    res.json(data.items || []);
  } catch (error) {
    console.error("❌ Error al buscar libros:", error.message);
    res.status(500).json({ 
      error: "Error al buscar libros",
      message: error.message 
    });
  }
};

// Obtener libro por ID
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`Obteniendo libro con ID: ${id}`);

    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    );

    if (!response.ok) {
      throw new Error(`Google Books API error: ${response.status}`);
    }

    const data = await response.json();

    console.log(`✅ Libro encontrado: ${data.volumeInfo?.title}`);

    res.json(data);
  } catch (error) {
    console.error("❌ Error al obtener libro por ID:", error.message);
    res.status(500).json({ 
      error: "Error al obtener libro",
      message: error.message 
    });
  }
};

// Obtener categorías (ejemplo: saco de los libros buscados)
export const getCategories = async (req, res) => {
  try {
    const { q = "javascript" } = req.query;

    console.log(`Obteniendo categorías para término: ${q}`);

    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&maxResults=40`
    );

    if (!response.ok) {
      throw new Error(`Google Books API error: ${response.status}`);
    }

    const data = await response.json();
    
    const categories = [
      ...new Set(
        (data.items || []).flatMap((book) => book.volumeInfo.categories || [])
      ),
    ];

    console.log(`✅ Se encontraron ${categories.length} categorías`);

    res.json(categories);
  } catch (error) {
    console.error("❌ Error al obtener categorías:", error.message);
    res.status(500).json({ 
      error: "Error al obtener categorías",
      message: error.message 
    });
  }
};