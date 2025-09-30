import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BooksProvider } from './context/BooksContext.jsx'
import './index.css'

/**
 * Punto de entrada de la aplicación
 * Envuelve App con el BooksProvider para proveer el contexto global
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BooksProvider>
      <App />
    </BooksProvider>
  </React.StrictMode>,
)