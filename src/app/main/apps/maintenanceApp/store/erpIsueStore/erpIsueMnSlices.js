import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getErpIsueMnSlices = createAsyncThunk(
    'mnApp/erpsisue/getErpsIsue',
    async () => {
        const response = await axios.get(`http://192.168.192.7:5000/issumnerp`)

        const data = await response.data

        return data
    }
)

const Adapter = createEntityAdapter({
    selectId: (data) => data.id,
    sortComparer: (a, b) => b.modi_time.localeCompare(a.modi_time),
})

export const {
    selectAll: selectMnErpsIssue,
    selectById: selectMnErpsIssueById,
} = Adapter.getSelectors((state) => state.mnApp.erpsisue)

const erpIsueMnSlices = createSlice({
    name: 'mnApp/erpsisue',
    initialState: Adapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getErpIsueMnSlices.fulfilled]: Adapter.setAll,
    },
})

export default erpIsueMnSlices.reducer
