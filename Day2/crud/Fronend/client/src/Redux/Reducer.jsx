// src/redux/reducer.js
import { BOOK_REQUEST, BOOK_SUCCESS, BOOK_FAIL, BOOK_RESET_STATUS } from './Action';

const initialState = {
  books: [],
  loading: false,
  error: null,
  success: false,
  actionType: '',  
};

export const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOK_REQUEST:
      return { ...state, loading: true, error: null, success: false, actionType: '' };

    case BOOK_SUCCESS:
      if (Array.isArray(action.payload)) {
        return { ...state, loading: false, books: action.payload, success: true, actionType: action.actionType };
      } else if (typeof action.payload === 'string') {
        // Deletion: remove book by ID
        return {
          ...state,
          loading: false,
          books: state.books.filter((book) => book._id !== action.payload),
          success: true,
          actionType: action.actionType,
        };
      } else {
        // Create or Update: upsert book
        const updatedBooks = state.books.map((book) =>
          book._id === action.payload._id ? action.payload : book
        );
        const isExisting = state.books.some((book) => book._id === action.payload._id);
        return {
          ...state,
          loading: false,
          books: isExisting ? updatedBooks : [...state.books, action.payload],
          success: true,
          actionType: action.actionType,
        };
      }

    case BOOK_FAIL:
      return { ...state, loading: false, error: action.payload, success: false, actionType: '' };

    case BOOK_RESET_STATUS:
      return { ...state, success: false, error: null, actionType: '' };

    default:
      return state;
  }
};
