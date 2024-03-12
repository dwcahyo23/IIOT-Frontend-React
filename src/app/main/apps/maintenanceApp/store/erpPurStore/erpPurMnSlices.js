import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'
import _ from 'lodash'

export const getErpPurMnSlices = createAsyncThunk(
    'mnApp/erpPur/getErpPurMnSlices',
    async () => {
        const response = await axios.get(`http://localhost:5000/purmnerp`)

        const data = await response.data

        return data
    }
)

const Adapter = createEntityAdapter({
    selectId: (data) => data.id,
    sortComparer: (a, b) => b.pur_sheet_no.localeCompare(a.pur_sheet_no),
})

export const { selectAll: selectMnErpsPur, selectById: selectMnErpsPurById } =
    Adapter.getSelectors((state) => state.mnApp.erppur)

const erpPurMnSlices = createSlice({
    name: 'mnApp/erppur',
    initialState: Adapter.getInitialState({
        isPendingErpPur: false,
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
        [getErpPurMnSlices.fulfilled]: (state, action) => {
            state.isPendingErpPur = false
            Adapter.setAll(state, action.payload)
        },
        [getErpPurMnSlices.pending]: (state, action) => {
            state.isPendingErpPur = true
        },
    },
})

/*
 * CREATE CUSTOM SELECTOR FOR STOK
 */

export const searchText = ({ mnApp }) => mnApp.erppur.searchText
export const isPendingErpPur = ({ mnApp }) => mnApp.erppur.isPendingErpPur

export const filterdErpsPur = createSelector(
    [selectMnErpsPur, searchText],
    (data, text) => {
        function getFilter() {
            if (text.length === 0) {
                return data
            }
            return _.filter(data, (val) => {
                if (
                    (!_.isUndefined(val.mat_no) &&
                        !_.isNull(val.mat_no) &&
                        val.mat_no
                            .toLowerCase()
                            .includes(text.toLowerCase())) ||
                    (!_.isUndefined(val.pur_sheet_no) &&
                        !_.isNull(val.pur_sheet_no) &&
                        val.pur_sheet_no
                            .toLowerCase()
                            .includes(text.toLowerCase())) ||
                    (!_.isUndefined(val.mat_name) &&
                        !_.isNull(val.mat_name) &&
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

export const { setSearchText } = erpPurMnSlices.actions

export default erpPurMnSlices.reducer
