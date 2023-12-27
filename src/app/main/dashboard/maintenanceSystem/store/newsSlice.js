import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getnewsSlice = createAsyncThunk(
    'dashboard/NewsLog/getnewsSlice',
    async () => {
        const response = await axios.get('http://localhost:5000/newsLog')
        const data = await response.data
        return data
    }
)

const newsAdapter = createEntityAdapter({
    selectId: (data) => data.id,
})

export const { selectAll: selectNews, selectById: selectNewsById } =
    newsAdapter.getSelectors((state) => state.dashboard.NewsLog)

const newsSlice = createSlice({
    name: 'dashboard/NewsLog',
    initialState: newsAdapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getnewsSlice.fulfilled]: newsAdapter.setAll,
    },
})

export default newsSlice.reducer
