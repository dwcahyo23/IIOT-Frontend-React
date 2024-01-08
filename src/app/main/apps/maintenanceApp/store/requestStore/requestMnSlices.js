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

export const requestsPending = ({ mnApp }) => mnApp.requests.pending

const requestMnSlices = createSlice({
    name: 'mnApp/requests',
    initialState: MnRequestAdapter.getInitialState({ pending: false }),
    reducers: {},
    extraReducers: {
        [getRequestSlices.fulfilled]: (state, action) => {
            state.pending = false
            MnRequestAdapter.setAll(state, action.payload)
        },
        [getRequestSlices.pending]: (state, action) => {
            state.pending = true
        },
        [saveRequest.fulfilled]: MnRequestAdapter.upsertOne,
        [removeRequest.fulfilled]: (state, action) =>
            MnRequestAdapter.removeOne(state, action.payload),
    },
})

export default requestMnSlices.reducer
