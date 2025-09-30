import { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('React');

  useEffect(() => {
    axios.get(`http://localhost:3000/api/books?q=${query}`)
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, [query]);

  return (
    <div className="p-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 mb-4 w-full"
        placeholder="Buscar libros..."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map(book => (
          <div key={book.id} className="border p-4 rounded shadow">
            <h2 className="font-bold mb-2">{book.volumeInfo.title}</h2>
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt={book.volumeInfo.title}
              className="mb-2"
            />
            <p>{book.volumeInfo.authors?.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}