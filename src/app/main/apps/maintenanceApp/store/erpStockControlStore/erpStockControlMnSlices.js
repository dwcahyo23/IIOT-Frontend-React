import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

import { comUtils } from '../erpStore/erpMnSlices'

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

/*
 * CREATE CUSTOM SELECTOR FOR STOK
 */

export const stockControlCategory = ({ mnApp }) =>
    mnApp.erpsstockcontrol.stokCategory
export const searchText = ({ mnApp }) => mnApp.erpsstockcontrol.searchText
export const stockControlStatus = ({ mnApp }) => mnApp.erpsstockcontrol.status
export const isPendingStockControl = ({ mnApp }) =>
    mnApp.erpsstockcontrol.isPendingStockControl

export const selectCategoryStock = createSelector(
    [selectMnErpsStockControl, comUtils],
    (data, com) => {
        const x = _(data)
            .filter({ mat_com: com })
            .groupBy('sparepart_category')
            .keys()
            .push('ALL')
            .sort()
            .value()

        return x
    }
)

/*
 * END CREATE CUSTOM SELECTOR FOR STOK
 */

const erpStockControlMnSlices = createSlice({
    name: 'mnApp/erpsstockcontrol',
    initialState: Adapter.getInitialState({
        stokCategory: 'ALL',
        searchText: '',
        status: 'ALL',
        isPendingStockControl: false,
    }),
    reducers: {
        setStockControlCategory: {
            reducer: (state, action) => {
                state.stokCategory = action.payload
            },
            prepare: (event) => {
                return { payload: event }
            },
        },
        setSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload
            },
            prepare: (event) => ({ payload: event }),
        },
        setStockControlStatus: {
            reducer: (state, action) => {
                state.status = action.payload
            },
            prepare: (event) => ({ payload: event }),
        },
    },
    extraReducers: {
        [getErpStockControlMnSlices.fulfilled]: (state, action) => {
            state.isPendingStockControl = false
            Adapter.setAll(state, action.payload)
        },
        [getErpStockControlMnSlices.pending]: (state, action) => {
            state.isPendingStockControl = true
        },
    },
})

export const { setStockControlCategory, setSearchText, setStockControlStatus } =
    erpStockControlMnSlices.actions

export default erpStockControlMnSlices.reducer
