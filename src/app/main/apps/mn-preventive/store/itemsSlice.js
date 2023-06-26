import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getItems = createAsyncThunk(
    'mnPreventiveApp/items/getItems',
    async () => {
        const response = await axios.get('http://localhost:5000/machineitems')
        const data = await response.data
        return data
    }
)

export const removeItems = createAsyncThunk(
    'mnPreventiveApp/items',
    async (itemsIds, { dispatch, getState }) => {
        console.log(itemsIds)
        await axios.delete('http://localhost:5000/machineitem', {
            data: itemsIds,
        })

        return itemsIds
    }
)

const itemsAdapter = createEntityAdapter({
    selectId: (items) => items.uuid,
})

export const { selectAll: selectItems, selectById: selectedItemsById } =
    itemsAdapter.getSelectors((state) => state.mnPreventiveApp.items)

const itemsSlice = createSlice({
    name: 'mnPreventiveApp/items',
    initialState: itemsAdapter.getInitialState({
        searchText: '',
    }),
    reducers: {
        setItemsSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload
            },
            prepare: (event) => ({ payload: event.target.value || '' }),
        },
    },
    extraReducers: {
        [getItems.fulfilled]: itemsAdapter.setAll,
        [removeItems.fulfilled]: (state, action) =>
            itemsAdapter.removeMany(state, action.payload),
    },
})

export const { setItemsSearchText } = itemsSlice.actions

export const selectItemsSearchText = ({ mnPreventiveApp }) =>
    mnPreventiveApp.items.searchText

export default itemsSlice.reducer
