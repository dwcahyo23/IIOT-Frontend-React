import { combineReducers } from '@reduxjs/toolkit';
import items from './itemsSlice';
import item from './itemSlice';

const reducer = combineReducers({
  items,
  item,
});

export default reducer;
