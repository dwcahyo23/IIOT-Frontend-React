import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getMnRepSlice = createAsyncThunk(
    'dashboard/MNRep/getMnRepSlice',
    async () => {
        const response = await axios.get(
            'http://localhost:5000/maintenanceReport'
        )
        const data = await response.data
        return data
    }
)

const repAdapter = createEntityAdapter({
    selectId: (data) => data.sheet_no,
})

export const { selectAll: selectApRep, selectById: selectApRepById } =
    repAdapter.getSelectors((state) => state.dashboard.MNRep)

const mnRepSlice = createSlice({
    name: 'dashboard/MNRep',
    initialState: repAdapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getMnRepSlice.fulfilled]: repAdapter.setAll,
    },
})

export default mnRepSlice.reducer
