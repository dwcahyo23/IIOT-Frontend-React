import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { saveScw, removeScw } from './scwProductionSlice'

export const getScwSlices = createAsyncThunk('pdApp/scw/getScws', async () => {
    const response = await axios.get(`http://192.168.192.7:5000/ProductionScw`)

    const data = await response.data

    return data
})

const ScwAdapter = createEntityAdapter({
    selectedId: (data) => data.uuid,
})

export const { selectAll: selectScws, selectById: selectScwById } =
    ScwAdapter.getSelectors((state) => state.pdApp.scws)

export const scwsCode = ({ pdApp }) => pdApp.scws.scwsCode

export const scwsArea = ({ pdApp }) => pdApp.scws.scwsArea

//? FILTER No MESIN
export const selectScwsCode = createSelector([selectScwsCode], (data) => {
    const x = _(data).groupBy('mch_code').keys().push('ALL').sort().value()

    return x
})

//? FILTER AREA
export const selectScwsArea = createSelector(
    [selectScws, scwsCode],
    (data, code) => {
        const x = _(data)
            .filter({ mch_code: code })
            .groupBy('area')
            .keys()
            .push('ALL')
            .sort()
            .value()

        return x
    }
)

/*
 * END OF CUSTOM SELECTOR
 */

const scwProductionSlices = createSlice({
    name: 'pdApp/scw',
    initialState: ScwAdapter.getInitialState({
        scwsCode: 'ALL',
        scwsProcess: 'ALL',
    }),
    reducers: {
        setScwsCode: {
            reducer: (state, action) => {
                state.scwsCode = action.payload
            },
            prepare: (event) => {
                return { payload: event }
            },
        },
        setScwsArea: {
            reducer: (state, action) => {
                state.scwsArea = action.payload
            },
            prepare: (event) => {
                return { payload: event }
            },
        },
    },
    extraReducers: {
        [getScwSlices.fulfilled]: ScwAdapter.setAll,
        [saveScw.fulfilled]: ScwAdapter.upsertOne,
        [removeScw.fulfilled]: (state, action) =>
            ScwAdapter.removeOne(state, action.payload),
    },
})

export const { setScwsCode, setScwsArea } = scwProductionSlices.actions

export default scwProductionSlices.reducer
