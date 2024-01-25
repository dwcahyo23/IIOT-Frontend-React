import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getErpStockControlMnSlices = createAsyncThunk(
    'mnApp/erpsstockcontrol/getErpStockControlMnSlices',
    async () => {
        const response = await axios.get(
            `http://192.168.192.7:5000/mnstockcontrol`
        )

        const data = await response.data

        return data
    }
)

const Adapter = createEntityAdapter({
    selectId: (data) => data.uuid,
    sortComparer: (a, b) => b.mat_code.localeCompare(a.mat_code),
})

export const {
    selectAll: selectMnErpsStockControl,
    selectById: selectMnErpsStockControlById,
} = Adapter.getSelectors((state) => state.mnApp.erpsstockcontrol)

const erpStockControlMnSlices = createSlice({
    name: 'mnApp/erpsstockcontrol',
    initialState: Adapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getErpStockControlMnSlices.fulfilled]: Adapter.setAll,
    },
})

export default erpStockControlMnSlices.reducer
