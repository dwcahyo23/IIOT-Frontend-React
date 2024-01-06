import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { removeRequest, saveRequest } from './requestMnSlice'

export const getRequestSlices = createAsyncThunk(
    'mnApp/requests/getRequests',
    async () => {
        const response = await axios.get(`http://localhost:5000/mnrequest`)

        const data = await response.data

        return data
    }
)

const MnRequestAdapter = createEntityAdapter({
    selectId: (data) => data.uuid_request,
    sortComparer: (a, b) => a.uuid_request.localeCompare(b.uuid_request),
})

export const { selectAll: selectMnRequests, selectById: selectMnRequestsById } =
    MnRequestAdapter.getSelectors((state) => state.mnApp.requests)

const requestMnSlices = createSlice({
    name: 'mnApp/requests',
    initialState: MnRequestAdapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getRequestSlices.fulfilled]: MnRequestAdapter.setAll,
        [saveRequest.fulfilled]: MnRequestAdapter.upsertOne,
        [removeRequest.fulfilled]: (state, action) =>
            MnRequestAdapter.removeOne(state, action.payload),
    },
})

export default requestMnSlices.reducer
