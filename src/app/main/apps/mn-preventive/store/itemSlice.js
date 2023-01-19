import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getItem = createAsyncThunk('mnPreventiveApp/item/getItem', async (itemId) => {
  const response = await axios.get(`http://localhost:5000/machineitem/${itemId}`);
  const data = await response.data;

  return data === undefined ? null : data;
});

export const removeItem = createAsyncThunk(
  'mnPreventiveApp/item/removeItem',
  async (val, { dispatch, getState }) => {
    const { uuid } = getState().mnPreventiveApp.item;
    await axios.delete(`http://localhost:5000/machineitem/${uuid}`);

    return uuid;
  }
);

export const saveItem = createAsyncThunk(
  'mnPreventiveApp/item/saveItem',
  async (itemData, { dispatch, getState }) => {
    // delete itemData.machines;
    // delete itemData.machine_index;
    console.log(itemData);
    const { uuid } = getState().mnPreventiveApp;
    const response = await axios.patch(
      `http://localhost:5000/machineitem/${itemData.uuid}`,
      itemData
    );
    const data = await response.data;

    return data;
  }
);

const itemSlice = createSlice({
  name: 'mnPreventiveApp/item',
  initialState: null,
  reducers: {
    resetItem: () => null,
    newItem: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          isNew: true,
          uuid: 'uuid',
          machineIndexUuid: '',
          bom: '',
          category: '',
          item_name: '',
          item_life_time: '',
          item_lead_time: '',
          change_at: '',
          item_status: '',
          images: [],
          changes: [],
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

export const { newItem, resetItem } = itemSlice.actions;

export const selectItem = ({ mnPreventiveApp }) => mnPreventiveApp.item;

export default itemSlice.reducer;
