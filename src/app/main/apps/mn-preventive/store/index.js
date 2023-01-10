import { combineReducers } from '@reduxjs/toolkit';
import items from './itemsSlice';
import item from './itemSlice';
import machines from './machinesSlice';

const reducer = combineReducers({
  items,
  item,
  machines,
});

export default reducer;
