// src/redux/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { bookReducer } from './reducer';

const rootReducer = combineReducers({
  book: bookReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
