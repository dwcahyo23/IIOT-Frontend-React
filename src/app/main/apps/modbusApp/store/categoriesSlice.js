import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getCategories = createAsyncThunk(
    'modbusApp/categories/getCategories',
    async () => {
        const response = await axios.get(
            'http://192.168.129.7:5000/getCategoryAddress'
        )
        const data = await response.data

        return data
    }
)

const categoriesAdapter = createEntityAdapter({
    selectId: (items) => items.uuid,
})

export const { selectAll: selectCategories, selectById: selectCategoryById } =
    categoriesAdapter.getSelectors((state) => state.modbusApp.categories)

const categoriesSlice = createSlice({
    name: 'modbusApp/categories',
    initialState: categoriesAdapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getCategories.fulfilled]: categoriesAdapter.setAll,
    },
})

export default categoriesSlice.reducer
