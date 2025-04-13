// src/App.jsx
import React from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>📚 Book Management App</h1>
      <BookList />
      <ToastContainer position="top-right" autoClose={3000} />

    </div>
  );
};

export default App;
