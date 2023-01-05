import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getItem = createAsyncThunk('mnPreventiveApp/item/getItem', async (itemId) => {
  const response = await axios.get(`http://localhost:5000/item/${itemId}`);
  const data = await response.data;

  return data === undefined ? null : data;
});

export const removeItem = createAsyncThunk(
  'mnPreventiveApp/item/removeItems',
  async (val, { dispatch, getState }) => {
    const { id } = getState().mnPreventiveApp.item;
    await axios.delete(`http://localhost:5000/item/${id}`);

    return id;
  }
);

export const saveItem = createAsyncThunk(
  'mnPreventiveApp/item/saveItem',
  async (itemData, { dispatch, getState }) => {
    const { id } = getState().mnPreventiveApp;
    const response = await axios.put(`http://localhost:500/item/${id}`);
    const data = await response.data;

    return data;
  }
);

const itemsSlice = createSlice({
  name: 'mnPreventiveApp/item',
  initialState: null,
  reducers: {
    resetItem: () => null,
    newItem: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          bom: '',
          category: '',
          item_name: '',
          item_life_time: '',
          item_lead_time: '',
          change_at: '',
          change_next: '',
        },
      }),
    },
  },
  extraReducers: {
    [getItem.fulfilled]: (state, action) => action.payload,
    [saveItem.fulfilled]: (state, action) => action.payload,
    [removeItem.fulfilled]: (state, action) => null,
  },
});

export const { newItems, resetItem } = itemsSlice.actions;

export const selectItem = ({ mnPreventiveApp }) => mnPreventiveApp.item;

export default itemsSlice.reducer;
