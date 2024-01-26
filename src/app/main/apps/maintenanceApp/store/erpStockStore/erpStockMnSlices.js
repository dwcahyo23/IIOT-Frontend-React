import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { comUtils } from '../erpStore/erpMnSlices'
import _ from 'lodash'
import {
    selectMnErpsStockControl,
    stockControlStatus,
} from '../erpStockControlStore/erpStockControlMnSlices'
import {
    stockControlCategory,
    searchText,
} from '../erpStockControlStore/erpStockControlMnSlices'

export const getErpStockMnSlices = createAsyncThunk(
    'mnApp/erpsstock/getErpsStock',
    async () => {
        const response = await axios.get(`http://192.168.192.7:5000/stokmnerp`)

        const data = await response.data

        return data
    }
)

const Adapter = createEntityAdapter({
    selectId: (data) => data.id,
    sortComparer: (a, b) => a.mat_no.localeCompare(b.mat_no),
})

export const {
    selectAll: selectMnErpsStock,
    selectById: selectMnErpsStockById,
} = Adapter.getSelectors((state) => state.mnApp.erpsstock)

/*
 * CREATE CUSTOM SELECTOR FOR STOK
 */

export const isPendingErpStock = ({ mnApp }) =>
    mnApp.erpsstock.isPendingErpStock

const dataUtils = createSelector(
    [selectMnErpsStock, selectMnErpsStockControl],
    (data, join) => {
        if (data && join) {
            return _.map(data, (val) => {
                return {
                    ...val,
                    stock_control:
                        _.find(join, {
                            mat_code: val.mat_no,
                            mat_com: val.stk_no.substring(0, 2),
                        }) || {},
                }
            })
        }
    }
)

export const filteredErpsStock = createSelector(
    [dataUtils, comUtils, stockControlCategory, stockControlStatus, searchText],
    (data, com, cat, status, text) => {
        function getFilter() {
            if (
                text.length === 0 &&
                com === 'ALL' &&
                cat === 'ALL' &&
                status === 'ALL'
            ) {
                return data
            }
            return _.filter(data, (val) => {
                if (com !== 'ALL' && val.stk_no.substring(0, 2) !== com) {
                    return false
                }

                if (
                    cat !== 'ALL' &&
                    val.stock_control?.sparepart_category !== cat
                ) {
                    return false
                }
                if (
                    status !== 'ALL' &&
                    val.stk_qty >= val.stock_control?.op_qty
                ) {
                    return false
                }

                if (
                    (!_.isUndefined(val.mat_no) &&
                        val.mat_no
                            .toLowerCase()
                            .includes(text.toLowerCase())) ||
                    (!_.isUndefined(val.mat_name) &&
                        val.mat_name.toLowerCase().includes(text.toLowerCase()))
                ) {
                    return val
                }
            })
        }

        if (data) {
            return getFilter()
        }
    }
)

const erpStockMnSlices = createSlice({
    name: 'mnApp/erpsstock',
    initialState: Adapter.getInitialState({
        isPendingErpStock: false,
    }),
    reducers: {},
    extraReducers: {
        [getErpStockMnSlices.fulfilled]: (state, action) => {
            state.isPendingErpStock = false
            Adapter.setAll(state, action.payload)
        },
        [getErpStockMnSlices.pending]: (state, action) => {
            state.isPendingErpStock = true
        },
    },
})

export default erpStockMnSlices.reducer
