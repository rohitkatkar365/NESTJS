// src/redux/actions.js
import API from '../api/axiosConfig';

// Action Types
export const BOOK_REQUEST = 'BOOK_REQUEST';
export const BOOK_SUCCESS = 'BOOK_SUCCESS';
export const BOOK_FAIL = 'BOOK_FAIL';
export const BOOK_RESET_STATUS = 'BOOK_RESET_STATUS'; // New action to reset status

// Fetch all books
export const fetchBooks = () => async (dispatch) => {
  dispatch({ type: BOOK_REQUEST });
  try {
    const { data } = await API.get('/book');
    dispatch({ type: BOOK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BOOK_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Create a new book
export const createBook = (bookData) => async (dispatch) => {
  dispatch({ type: BOOK_REQUEST });
  try {
    const { data } = await API.post('/book/new', bookData);
    dispatch({ type: BOOK_SUCCESS, payload: data, actionType: 'CREATE' });
  } catch (error) {
    dispatch({
      type: BOOK_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Update an existing book
export const updateBook = (id, bookData) => async (dispatch) => {
  dispatch({ type: BOOK_REQUEST });
  try {
    const { data } = await API.put(`/book/${id}`, bookData);
    dispatch({ type: BOOK_SUCCESS, payload: data, actionType: 'UPDATE' });
  } catch (error) {
    dispatch({
      type: BOOK_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Delete a book
export const deleteBook = (id) => async (dispatch) => {
  dispatch({ type: BOOK_REQUEST });
  try {
    await API.delete(`/book/${id}`);
    dispatch({ type: BOOK_SUCCESS, payload: id, actionType: 'DELETE' });
  } catch (error) {
    dispatch({
      type: BOOK_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Reset status action
export const resetBookStatus = () => ({
  type: BOOK_RESET_STATUS,
});
