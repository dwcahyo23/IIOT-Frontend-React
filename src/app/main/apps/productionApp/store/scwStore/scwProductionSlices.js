import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getScwSlices = createAsyncThunk('pdApp/scw/getScws', async () => {
    const response = await axios.get(`http://192.168.192.7:5000/ProductionScw`)

    const data = await response.data

    return data
})

const ScwAdapter = createEntityAdapter({
    selectId: (data) => data.uuid,
})

export const { selectAll: selectScws, selectById: selectScwById } =
    ScwAdapter.getSelectors((state) => state.pdApp.scws)

/*
 * END OF CUSTOM SELECTOR
 */

const scwProductionSlices = createSlice({
    name: 'pdApp/scws',
    initialState: ScwAdapter.getInitialState({
        scwDepNo: 'ALL',
        searchText: '',
        scwYear: 'ALL',
        scwPrio: 'ALL',
        scwMonth: 'January',
        pending: false,
    }),
    reducers: {
        setScwDepNo: {
            reducer: (state, action) => {
                state.scwDepNo = action.payload
            },
            prepare: (event) => {
                return { payload: event }
            },
        },
        setScwYear: {
            reducer: (state, action) => {
                state.scwYear = action.payload
            },
            prepare: (event) => {
                return { payload: event }
            },
        },
    },
    extraReducers: {
        [getScwSlices.fulfilled]: ScwAdapter.setAll,
    },
})

export default scwProductionSlices.reducer
