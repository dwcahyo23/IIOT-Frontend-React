import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getCategories = createAsyncThunk(
    'maintenanceApp/categories/getCategories',
    async () => {
        const response = await axios.get('http://localhost:5000/getcategory')
        const data = await response.data

        return data
    }
)

const categoriesAdapter = createEntityAdapter({
    selectId: (items) => items.uuid,
})

export const { selectAll: selectCategories, selectById: selectCategoryById } =
    categoriesAdapter.getSelectors((state) => state.maintenanceApp.categories)

const categorySlice = createSlice({
    name: 'maintenanceApp/categories',
    initialState: categoriesAdapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getCategories.fulfilled]: categoriesAdapter.setAll,
    },
})

export default categorySlice.reducer
