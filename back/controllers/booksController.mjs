import axios from 'axios';
import 'dotenv/config';

const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
const MAX_RESULTS_PER_REQUEST = 10;
const TOTAL_LIMIT = 15;

export const getBooks = async (req, res) => {
  const query = req.query.q || 'javascript';
  let startIndex = 0;
  let allBooks = [];

  try {
    while (startIndex < TOTAL_LIMIT) {
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: query,
          maxResults: MAX_RESULTS_PER_REQUEST,
          startIndex,
          key: API_KEY
        }
      });

      const items = response.data.items || [];
      allBooks.push(...items);

      if (items.length < MAX_RESULTS_PER_REQUEST) break;
      startIndex += MAX_RESULTS_PER_REQUEST;
    }

    res.json(allBooks);
  } catch (error) {
    console.error('Error fetching books:', error.message);
    res.status(500).json({ message: 'Error al obtener libros' });
  }
};