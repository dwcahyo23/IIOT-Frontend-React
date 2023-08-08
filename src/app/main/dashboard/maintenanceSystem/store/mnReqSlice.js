import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getMnReqSlice = createAsyncThunk(
    'dashboard/MNReq/getMnReqSlice',
    async () => {
        const response = await axios.get(
            'http://192.168.192.7:5000/maintenanceRequest'
        )
        const data = await response.data
        return data
    }
)

const reqAdapter = createEntityAdapter({
    selectId: (data) => data.uuid_request,
})

export const { selectAll: selectApReq, selectById: selectApReqById } =
    reqAdapter.getSelectors((state) => state.dashboard.MNReq)

const mnReqSlice = createSlice({
    name: 'dashboard/MNReq',
    initialState: reqAdapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getMnReqSlice.fulfilled]: reqAdapter.setAll,
    },
})

export default mnReqSlice.reducer
