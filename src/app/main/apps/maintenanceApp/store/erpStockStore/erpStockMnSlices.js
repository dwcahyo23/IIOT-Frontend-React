import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { comUtils } from '../erpStore/erpMnSlices'
import _ from 'lodash'
import { selectMnErpsStockControl } from '../erpStockControlStroe/erpStockControlMnSlices'

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
    [dataUtils, comUtils],
    (data, com) => {
        function getFilter() {
            if (com === 'ALL') {
                return data
            }
            return _.filter(data, (val) => {
                if (com !== 'ALL' && val.stk_no.substring(0, 2) !== com) {
                    return false
                }
                return val
            })
        }

        if (data) {
            // console.log(getFilter())

            return getFilter()
        }
    }
)

const erpStockMnSlices = createSlice({
    name: 'mnApp/erpsstock',
    initialState: Adapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getErpStockMnSlices.fulfilled]: Adapter.setAll,
    },
})

export default erpStockMnSlices.reducer
