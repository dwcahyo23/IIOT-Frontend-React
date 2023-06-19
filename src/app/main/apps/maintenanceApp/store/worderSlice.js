import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getWorder = createAsyncThunk(
    'maintenanceApp/worder/getWorder',
    async () => {
        const response = await axios.get('http://192.168.192.7:5000/pgmtn')
        const data = await response.data
        return data
    }
)

const worderAdapter = createEntityAdapter({
    selectId: (worder) => worder.sheet_no,
})

export const { selectAll: selectWorder, selectById: selectWorderById } =
    worderAdapter.getSelectors((state) => state.maintenanceApp.worder)

const worderSlice = createSlice({
    name: 'maintenanceApp/worder',
    initialState: worderAdapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getWorder.fulfilled]: worderAdapter.setAll,
    },
})

export default worderSlice.reducer
