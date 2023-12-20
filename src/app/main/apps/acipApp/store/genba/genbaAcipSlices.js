import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'
import _ from 'lodash'
import { saveGenbaAcip, removeGenbaAcip } from './genbaAcipSlice'

export const getGenbasAcip = createAsyncThunk(
    'genbaAcip/genbas/getGenbasAcip',
    async () => {
        const response = await axios.get(`http://192.168.192.7:5000/genbaAcip`)

        const data = await response.data

        return data
    }
)

const genbasAcipAdapter = createEntityAdapter({
    selectId: (data) => data.id_genba,
})

export const { selectAll: selectGenbasAcip, selectById: selectGenbasAcipById } =
    genbasAcipAdapter.getSelectors((state) => state.genbaAcip.genbas)

const genbaAcipSlices = createSlice({
    name: 'genbaAcip/genbas',
    initialState: genbasAcipAdapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getGenbasAcip.fulfilled]: genbasAcipAdapter.setAll,
        [saveGenbaAcip.fulfilled]: genbasAcipAdapter.upsertOne,
        [removeGenbaAcip.fulfilled]: (state, action) =>
            genbasAcipAdapter.removeOne(state, action.payload),
    },
})

export default genbaAcipSlices.reducer
