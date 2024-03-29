import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { removeSparepart, saveSparepart } from './sparepartMnSlice'

export const getSparepartSlices = createAsyncThunk(
    'mnApp/spareparts/getSpareparts',
    async () => {
        const response = await axios.get(
            `http://192.168.192.7:5000/mnsparepart`
        )

        const data = await response.data

        return data
    }
)

const MnSparepartAdapter = createEntityAdapter({
    selectId: (data) => data.uuid,
})

export const {
    selectAll: selectMnSpareparts,
    selectById: selectMnSparepartsById,
} = MnSparepartAdapter.getSelectors((state) => state.mnApp.spareparts)

const sparepartMnSlices = createSlice({
    name: 'mnApp/spareparts',
    initialState: MnSparepartAdapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getSparepartSlices.fulfilled]: MnSparepartAdapter.setAll,
        [saveSparepart.fulfilled]: MnSparepartAdapter.upsertOne,
        [removeSparepart.fulfilled]: (state, action) =>
            MnSparepartAdapter.removeOne(state, action.payload),
    },
})

export default sparepartMnSlices.reducer
