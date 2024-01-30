import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { _ } from 'core-js'
import { comUtils } from '../erpStore/erpMnSlices'

export const getErpIsueMnSlices = createAsyncThunk(
    'mnApp/erpsisue/getErpsIsue',
    async () => {
        const response = await axios.get(`http://192.168.192.7:5000/issumnerp`)

        const data = await response.data

        return data
    }
)

const Adapter = createEntityAdapter({
    selectId: (data) => data.id,
    sortComparer: (a, b) => b.modi_time.localeCompare(a.modi_time),
})

export const {
    selectAll: selectMnErpsIssue,
    selectById: selectMnErpsIssueById,
} = Adapter.getSelectors((state) => state.mnApp.erpsisue)

const erpIsueMnSlices = createSlice({
    name: 'mnApp/erpsisue',
    initialState: Adapter.getInitialState({
        isPendingErpIsue: false,
        searchText: '',
    }),
    reducers: {
        setSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload
            },
            prepare: (event) => ({ payload: event }),
        },
    },
    extraReducers: {
        [getErpIsueMnSlices.fulfilled]: (state, action) => {
            state.isPendingErpIsue = false
            Adapter.setAll(state, action.payload)
        },
        [getErpIsueMnSlices.pending]: (state, action) => {
            state.isPendingErpIsue = true
        },
    },
})

/*
 * CREATE CUSTOM SELECTOR FOR STOK
 */

export const searchText = ({ mnApp }) => mnApp.erpsisue.searchText
export const isPendingErpIsue = ({ mnApp }) => mnApp.erpsisue.isPendingErpIsue

export const filterdErpsIsue = createSelector(
    [selectMnErpsIssue, comUtils, searchText],
    (data, com, text) => {
        function getFilter() {
            if (text.length === 0 && com === 'ALL') {
                return data
            }
            return _.filter(data, (val) => {
                if (com !== 'ALL' && val.stk_no.substring(0, 2) !== com) {
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

/*
 * END CREATE CUSTOM SELECTOR FOR STOK
 */

export const { setSearchText } = erpIsueMnSlices.actions

export default erpIsueMnSlices.reducer
