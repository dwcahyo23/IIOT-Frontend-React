import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getItems = createAsyncThunk(
    'mnGenbaApp/items/getItems',
    async () => {
        const response = await axios.get('http://localhost:5000/genba/items')
        const data = await response.data
        return data
    }
)

export const removeItems = createAsyncThunk(
    'mnGenbaApp/items',
    async (itemsIds, { dispach, getState }) => {
        console.log(itemsIds)
        await axios.delete('http://localhost:5000/genba/item', {
            data: itemsIds,
        })
    }
)

const itemsAdapter = createEntityAdapter({
    selectId: (items) => items.uuid,
})

export const { selectAll: selectItems, selectById: selectedItemsId } =
    itemsAdapter.getSelectors((state) => state.mnGenbaApp.items)

const itemsSlice = createSlice({
    name: 'mnGenbaApp/items',
    initialState: itemsAdapter.getInitialState({
        searchText: '',
    }),
    reducers: {
        setItemSearchText: {
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

export const selectItemsSearchText = ({ mnGenbaApp }) =>
    mnGenbaApp.items.searchText

export default itemsSlice.reducer
