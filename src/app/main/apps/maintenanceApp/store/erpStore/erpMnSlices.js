import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'
import _ from 'lodash'
import { selectMnMachines } from '../machineStore/machineMnSlices'

export const getErpMnSlices = createAsyncThunk(
    'mnApp/erp/getErps',
    async () => {
        const response = await axios.get(`http://localhost:5000/mnerp`)

        const data = await response.data

        return data
    }
)

const MnErpAdapter = createEntityAdapter({
    selectId: (data) => data.sheet_no,
})

export const { selectAll: selectMnErps, selectById: selectMnErpsById } =
    MnErpAdapter.getSelectors((state) => state.mnApp.erp)

/**
 * * * Important Methods
 * TODO: Custom Create Selector on here!
 */

export const useJoinMaintenance = createSelector(
    [selectMnErps, selectMnMachines],
    (erps, machines) => {}
)

const erpMnSlices = createSlice({
    name: 'mnApp/erp',
    initialState: MnErpAdapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getErpMnSlices.fulfilled]: MnErpAdapter.setAll,
    },
})

export default erpMnSlices.reducer
