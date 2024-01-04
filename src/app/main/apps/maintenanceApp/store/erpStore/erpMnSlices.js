import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'
import _ from 'lodash'
import dayjs from 'dayjs'
import {
    selectMnMachines,
    machinesCom,
    machinesResponbility,
    machinesSection,
} from '../machineStore/machineMnSlices'

import { getCountStatusErp, getMonthErp } from './erpUtils'

export const getErpMnSlices = createAsyncThunk(
    'mnApp/erps/getErps',
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
    MnErpAdapter.getSelectors((state) => state.mnApp.erps)

/*
 * CREATE CUSTOM SELECTOR
 */

export const erpDepNo = ({ mnApp }) => mnApp.erps.erpDepNo

export const erpYear = ({ mnApp }) => mnApp.erps.erpYear

export const searchText = ({ mnApp }) => mnApp.erps.searchText

export const erpPending = ({ mnApp }) => mnApp.erps.pending

export const selectErpYear = createSelector(
    [selectMnErps, machinesCom],
    (data, com) => {
        const x = _(data)
            .groupBy((val) => dayjs(val.ymd).format('YYYY'))
            .keys()
            .push('ALL')
            .sort()
            .value()

        return x
    }
)

export const selectErpDepNo = createSelector(
    [selectMnErps, machinesCom],
    (data, com) => {
        const x = _(data)
            .filter({ com_no: com })
            .groupBy('dep_no')
            .keys()
            .push('ALL')
            .sort()
            .value()

        return x
    }
)

const comUtils = createSelector([machinesCom], (com) => {
    if (com === 'GM1') {
        return '01'
    }

    if (com === 'GM2') {
        return '02'
    }

    if (com === 'GM3') {
        return '03'
    }

    if (com === 'GM5') {
        return '06'
    }
})

const dataUtils = createSelector(
    [selectMnErps, selectMnMachines],
    (erps, machines) => {
        const x = _.map(erps, (val) => {
            return {
                ...val,
                mch_index: _.find(machines, {
                    mch_code: val.mch_no,
                    mch_com:
                        val.com_no == '01'
                            ? 'GM1'
                            : val.com_no == '02'
                            ? 'GM2'
                            : val.com_no == '03'
                            ? 'GM3'
                            : 'GM5',
                }),
            }
        })

        return x
    }
)

export const filteredErps = createSelector(
    [
        dataUtils,
        comUtils,
        machinesCom,
        machinesSection,
        machinesResponbility,
        erpYear,
        searchText,
    ],
    (data, com, selectCom, section, responsible, year, text) => {
        function getFilter() {
            if (
                text.length === 0 &&
                selectCom === 'ALL' &&
                responsible === 'ALL' &&
                section === 'ALL' &&
                year == 'ALL'
            ) {
                return data
            }
            return _.filter(data, (val) => {
                if (com !== 'ALL' && val.com_no !== com) {
                    return false
                }

                if (year !== 'ALL' && dayjs(val.ymd).format('YYYY') !== year) {
                    return false
                }

                if (
                    section !== 'ALL' &&
                    val?.mch_index?.section !== section.toLowerCase()
                ) {
                    return false
                }

                if (
                    responsible !== 'ALL' &&
                    val?.mch_index?.responsible.toLowerCase() !==
                        responsible.toLowerCase()
                ) {
                    return false
                }

                return val?.sheet_no.toLowerCase().includes(text.toLowerCase())
            })
        }

        if (data) {
            return getFilter()
        }
    }
)

export const filterChartErps = createSelector([filteredErps], (data) => {
    function getChart() {
        const month = getMonthErp()

        const chart = getCountStatusErp(data)

        const x = _.map(month, (val) => {
            return { name: val, data: chart[val] || { Open: 0, Close: 0 } }
        })

        return x
    }

    if (data) {
        return getChart()
    }
})

/*
 * END OF CUSTOM SELECTOR
 */

const erpMnSlices = createSlice({
    name: 'mnApp/erps',
    initialState: MnErpAdapter.getInitialState({
        erpDepNo: 'ALL',
        searchText: '',
        erpYear: 'ALL',
    }),
    reducers: {
        setErpDepNo: {
            reducer: (state, action) => {
                state.erpDepNo = action.payload
            },
            prepare: (event) => {
                return { payload: event }
            },
        },
        setErpYear: {
            reducer: (state, action) => {
                state.erpYear = action.payload
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
    },
    extraReducers: {
        [getErpMnSlices.fulfilled]: (state, action) => {
            state.pending = false
            MnErpAdapter.setAll(state, action.payload)
        },
        [getErpMnSlices.pending]: (state, action) => {
            state.pending = true
        },
    },
})

export const { setErpDepNo, setErpYear, setSearchText } = erpMnSlices.actions

export default erpMnSlices.reducer
