import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getApSlice = createAsyncThunk(
    'maintenanceSystem/ap/getApSlice',
    async () => {
        const response = await axios.get('http://localhost:5000/pgMaintenance')
        const data = await response.data
        return data
    }
)

const apAdapter = createEntityAdapter({
    selectId: (data) => data.sheet_no,
})

export const { selectAll: selectAp, selectById: selectApById } =
    apAdapter.getSelectors((state) => state.maintenanceSystem.ap)

const apSlice = createSlice({
    name: 'maintenanceSystem/ap',
    initialState: apAdapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getApSlice.fulfilled]: apAdapter.setAll,
    },
})

export default apSlice.reducer
