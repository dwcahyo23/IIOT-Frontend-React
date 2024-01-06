import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'
import _, { create } from 'lodash'
import dayjs from 'dayjs'
import {
    selectMnMachines,
    machinesCom,
    machinesResponbility,
    machinesSection,
} from '../machineStore/machineMnSlices'

import { getCountStatusErp, getMonthErp } from './erpUtils'

import { selectMnReports } from '../reportStore/reportMnSlices'

import { selectMnRequests } from '../requestStore/requestMnSlices'

import { selectMnSpareparts } from '../sparepartStore/sparepartMnSlices'

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

export const erpPrio = ({ mnApp }) => mnApp.erps.erpPrio

export const erpMonth = ({ mnApp }) => mnApp.erps.erpMonth

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

export const selectErpPriNo = createSelector([machinesSection], (section) => {
    if (section == 'machinery') {
        return [
            {
                val: 'ALL',
                label: 'ALL',
            },
            {
                val: '01',
                label: 'BREAKDOWN',
            },
            {
                val: '02',
                label: 'STILL RUN',
            },
            {
                val: '03',
                label: 'PREVENTIVE',
            },
            {
                val: '06',
                label: 'PROJECT MACHINERY',
            },
        ]
    }

    if (section == 'utility') {
        return [
            {
                val: 'ALL',
                label: 'ALL',
            },
            {
                val: '01',
                label: 'BREAKDOWN',
            },
            {
                val: '02',
                label: 'STILL RUN',
            },
            {
                val: '03',
                label: 'PREVENTIVE',
            },
        ]
    }

    if (section == 'workshop') {
        return [
            {
                val: 'ALL',
                label: 'ALL',
            },
            {
                val: '04',
                label: 'WORKSHOP STILL RUN',
            },
            {
                val: '05',
                label: 'WORKSHOP BREAKDOWN',
            },
            {
                val: '07',
                label: 'PROJECT WORKSHOP',
            },
        ]
    }

    if (section == 'ALL') {
        return [
            {
                val: 'ALL',
                label: 'ALL',
            },
            {
                val: '01',
                label: 'BREAKDOWN',
            },
            {
                val: '02',
                label: 'STILL RUN',
            },
            {
                val: '03',
                label: 'PREVENTIVE',
            },

            {
                val: '04',
                label: 'WORKSHOP STILL RUN',
            },
            {
                val: '05',
                label: 'WORKSHOP BREAKDOWN',
            },
            {
                val: '06',
                label: 'PROJECT MACHINERY',
            },
            {
                val: '07',
                label: 'PROJECT WORKSHOP',
            },
        ]
    }
})

export const selectErpMonth = createSelector(() => {
    return getMonthErp()
})

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

    return 'ALL'
})

const dataUtils = createSelector(
    [
        selectMnErps,
        selectMnMachines,
        selectMnReports,
        selectMnRequests,
        selectMnSpareparts,
    ],
    (erps, machines, reports, requests, spareparts) => {
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
                report_index: _.find(reports, {
                    sheet_no: val.sheet_no,
                }),
                request_index: _.filter(requests, { sheet_no: val.sheet_no }),
                sparepart_index: _.filter(spareparts, {
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
        erpPrio,
        machinesSection,
        machinesResponbility,
        erpYear,
    ],
    (data, com, prio, section, responsible, year) => {
        function getFilter() {
            if (
                com === 'ALL' &&
                responsible === 'ALL' &&
                section === 'ALL' &&
                year === 'ALL' &&
                prio === 'ALL'
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

                if (prio !== 'ALL' && val.pri_no !== prio) {
                    return false
                }

                if (
                    section !== 'ALL' &&
                    section !== 'workshop' &&
                    val?.mch_index?.section !== section
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

                //? belum nemu filter workshop find all
                if (section == 'workshop') {
                    return val
                }

                return val
            })
        }

        if (data) {
            return getFilter()
        }
    }
)

export const filteredErpsByMonth = createSelector(
    [filteredErps, searchText, erpMonth],
    (data, text, month) => {
        function getFilter() {
            if (text.length === 0 && !month) {
                return data
            }
            return _.filter(data, (val) => {
                if (month && dayjs(val.ymd).format('MMMM') !== month) {
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
            return {
                name: val.substring(0, 3),
                data: chart[val] || { Open: 0, Close: 0 },
            }
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
        erpPrio: 'ALL',
        erpMonth: 'January',
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
        setErpPrio: {
            reducer: (state, action) => {
                state.erpPrio = action.payload
            },
            prepare: (event) => ({ payload: event }),
        },
        setErpMonth: {
            reducer: (state, action) => {
                state.erpMonth = action.payload
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

export const {
    setErpDepNo,
    setErpYear,
    setSearchText,
    setErpPrio,
    setErpMonth,
} = erpMnSlices.actions

export default erpMnSlices.reducer
