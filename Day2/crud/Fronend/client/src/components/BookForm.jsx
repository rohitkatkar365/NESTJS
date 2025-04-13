// src/components/BookForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBook, updateBook, resetBookStatus } from '../Redux/Action';
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Paper,
  CircularProgress,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const categories = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Fantasy', 'Biography'];

const BookForm = ({ editingBook, setEditingBook }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    author: '',
    price: '',
    category: 'Fiction',
  });

  const [priceError, setPriceError] = useState('');
  const dispatch = useDispatch();
  const { loading, error, success, actionType } = useSelector((state) => state.book);

  useEffect(() => {
    // Reset Redux status on mount to avoid stale toast
    dispatch(resetBookStatus());
  }, [dispatch]);

  useEffect(() => {
    if (editingBook) {
      setForm({
        title: editingBook.title,
        description: editingBook.description,
        author: editingBook.author,
        price: editingBook.price,
        category: editingBook.category,
      });
    }
  }, [editingBook]);

  useEffect(() => {
    if (success || error) {
      if (success) {
        // Action types for success message based on the action
        if (actionType === 'CREATE') {
          toast.success('📚 Book added successfully!');
        } else if (actionType === 'UPDATE') {
          toast.success('✅ Book updated successfully!');
        } else if (actionType === 'DELETE') {
          toast.success('🗑️ Book deleted successfully!');
        }
      }

      if (error) {
        toast.error(`❌ ${error || 'Operation failed. Please try again.'}`);
      }

      // Reset the Redux state after toast
      setTimeout(() => {
        dispatch(resetBookStatus());
      }, 100);
    }
  }, [success, error, dispatch, actionType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validatePrice = (price) => {
    if (isNaN(price) || price <= 0) {
      setPriceError('Price must be a positive number');
      return false;
    }
    setPriceError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const price = parseFloat(form.price);
    if (!validatePrice(price)) return;

    const formData = { ...form, price };

    if (editingBook) {
      dispatch(updateBook(editingBook._id, formData));
      setEditingBook(null);
    } else {
      dispatch(createBook(formData));
    }

    setForm({
      title: '',
      description: '',
      author: '',
      price: '',
      category: 'Fiction',
    });
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
      <Typography variant="h6" gutterBottom>
        {editingBook ? 'Edit Book' : 'Add New Book'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
        <TextField
          label="Author"
          name="author"
          value={form.author}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={!!priceError}
          helperText={priceError}
        />
        <TextField
          select
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : editingBook ? 'Update Book' : 'Add Book'}
        </Button>
      </Box>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar pauseOnHover theme="light" />
    </Paper>
  );
};

export default BookForm;
