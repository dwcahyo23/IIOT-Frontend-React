import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getApSlice = createAsyncThunk(
    'dashboard/APPG/getApSlice',
    async () => {
        const response = await axios.get(
            'http://192.168.129.7:5000/pgMaintenance'
        )
        const data = await response.data
        return data
    }
)

const apAdapter = createEntityAdapter({
    selectId: (data) => data.sheet_no,
})

export const { selectAll: selectAp, selectById: selectApById } =
    apAdapter.getSelectors((state) => state.dashboard.APPG)

const apSlice = createSlice({
    name: 'dashboard/APPG',
    initialState: apAdapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getApSlice.fulfilled]: apAdapter.setAll,
    },
})

export default apSlice.reducer
