import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { removeStok, saveStok } from './stokMnSlice'

export const getStokSlices = createAsyncThunk(
    'mnApp/stoks/getStoks',
    async () => {
        const response = await axios.get(`http://localhost:5000/mnstock`)

        const data = await response.data

        return data
    }
)

const MnStokAdapter = createEntityAdapter({
    selectId: (data) => data.uuid,
    // sortComparer: (a, b) => a.title.localeCompare(b.title),
    sortComparer: (a, b) => a.mat_name.localeCompare(b.mat_name),
})

export const { selectAll: selectMnStoks, selectById: selectMnStoksById } =
    MnStokAdapter.getSelectors((state) => state.mnApp.stoks)

const stokMnSlices = createSlice({
    name: 'mnApp/stoks',
    initialState: MnStokAdapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getStokSlices.fulfilled]: MnStokAdapter.setAll,
        [saveStok.fulfilled]: MnStokAdapter.upsertOne,
        [removeStok]: (state, action) =>
            MnStokAdapter.removeOne(state, action.payload),
    },
})

export default stokMnSlices.reducer
