import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { saveReport, removeReport } from './reportMnSlice'

export const getReportSlices = createAsyncThunk(
    'mnApp/reports/getReports',
    async () => {
        const response = await axios.get(`http://localhost:5000/mnreport`)

        const data = await response.data

        return data
    }
)

const MnReportAdapter = createEntityAdapter({
    selectId: (data) => data.sheet_no,
})

export const { selectAll: selectMnReports, selectById: selectMnReportsById } =
    MnReportAdapter.getSelectors((state) => state.mnApp.reports)

const reportMnSlices = createSlice({
    name: 'mnApp/reports',
    initialState: MnReportAdapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getReportSlices.fulfilled]: MnReportAdapter.setAll,
        [saveReport.fulfilled]: MnReportAdapter.upsertOne,
        [removeReport.fulfilled]: (state, action) =>
            MnReportAdapter.removeOne(state, action.payload),
    },
})

export default reportMnSlices.reducer
