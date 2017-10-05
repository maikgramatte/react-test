import { combineReducers } from 'redux';
import search_results from './searchResults';

const rootReducer = combineReducers({
  search_results: search_results
});

export default rootReducer;