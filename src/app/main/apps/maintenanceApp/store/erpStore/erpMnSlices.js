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

import {
    getCountStatusErp,
    getCountStatusRequest,
    getMonthErp,
} from './erpUtils'

import { selectMnReports } from '../reportStore/reportMnSlices'

import { selectMnRequests } from '../requestStore/requestMnSlices'

import { selectMnSpareparts } from '../sparepartStore/sparepartMnSlices'

export const getErpMnSlices = createAsyncThunk(
    'mnApp/erps/getErps',
    async () => {
        const response = await axios.get(`http://192.168.192.7:5000/mnerp`)

        const data = await response.data

        return data
    }
)

const MnErpAdapter = createEntityAdapter({
    selectId: (data) => data.sheet_no,
    sortComparer: (a, b) => b.sheet_no.localeCompare(a.sheet_no),
})

export const { selectAll: selectMnErps, selectById: selectMnErpsById } =
    MnErpAdapter.getSelectors((state) => state.mnApp.erps)

const erpMnSlices = createSlice({
    name: 'mnApp/erps',
    initialState: MnErpAdapter.getInitialState({
        erpDepNo: 'ALL',
        searchText: '',
        erpYear: 'ALL',
        erpPrio: 'ALL',
        erpMonth: 'January',
        pending: false,
        reqStatus: 'ALL',
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

        setReqStatus: {
            reducer: (state, action) => {
                state.reqStatus = action.payload
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

/*
 * CREATE CUSTOM SELECTOR ERP
 */
export const erpDepNo = ({ mnApp }) => mnApp.erps.erpDepNo
export const erpYear = ({ mnApp }) => mnApp.erps.erpYear
export const searchText = ({ mnApp }) => mnApp.erps.searchText
export const erpPending = ({ mnApp }) => mnApp.erps.pending
export const erpPrio = ({ mnApp }) => mnApp.erps.erpPrio
export const erpMonth = ({ mnApp }) => mnApp.erps.erpMonth
export const reqStatus = ({ mnApp }) => mnApp.erps.reqStatus

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
    const x = getMonthErp()
    x.unshift('ALL')
    return x
})

export const comUtils = createSelector([machinesCom], (com) => {
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

        if (erps) {
            return x
        }
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
                year === 'ALL'
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

                if (section == 'machinery') {
                    return (
                        val.pri_no == '01' ||
                        val.pri_no == '02' ||
                        val.pri_no == '03' ||
                        val.pri_no == '06'
                    )
                }

                if (section == 'utility') {
                    return (
                        val.pri_no == '01' ||
                        val.pri_no == '02' ||
                        val.pri_no == '03' ||
                        val.pri_no == '06'
                    )
                }

                if (section == 'workshop') {
                    return (
                        val.pri_no == '04' ||
                        val.pri_no == '05' ||
                        val.pri_no == '07'
                    )
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
            if (text.length === 0) {
                return data
            }
            return _.filter(data, (val) => {
                if (
                    month !== 'ALL' &&
                    dayjs(val.ymd).format('MMMM') !== month
                ) {
                    return false
                }
                if (
                    (month &&
                        !_.isUndefined(val.sheet_no) &&
                        val.sheet_no
                            .toLowerCase()
                            .includes(text.toLowerCase())) ||
                    (!_.isUndefined(val.mch_no) &&
                        val.mch_no
                            .toLowerCase()
                            .includes(text.toLowerCase())) ||
                    (!_.isUndefined(val.mch_code) &&
                        val.mch_code.toLowerCase().includes(text.toLowerCase()))
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

export const filterErpsKanban = createSelector(
    [filteredErpsByMonth],
    (data) => {
        const kanban = {
            columns: [
                {
                    id: 1,
                    title: 'Open',
                    cards: [],
                },
                {
                    id: 2,
                    title: 'Request PP',
                    cards: [],
                },
                {
                    id: 3,
                    title: 'MRE',
                    cards: [],
                },
                {
                    id: 4,
                    title: 'Item Ready',
                    cards: [],
                },
                {
                    id: 5,
                    title: 'Close',
                    cards: [],
                },
            ],
        }

        function getFilter() {
            const open = _.filter(data, (val, i) => {
                if (val.chk_mark == 'N' && val.request_index.length < 1) {
                    return _.find(kanban.columns, { id: 1 }).cards.push({
                        id: i,
                        title: `${val.sheet_no} | ${val.mch_no}`,
                        description: _.toUpper(val.memo),
                        memo: '',
                    })
                }
            })

            const request_pp = _.filter(data, (val, i) => {
                if (val.chk_mark == 'N' && val.request_index.length > 1) {
                    const memo = []
                    _.filter(val.request_index, (data) => {
                        if (
                            _.startsWith(data.mre_request, 'M') == false &&
                            data.item_ready === 'N' &&
                            data.audit_request === 'N'
                        ) {
                            return memo.push({
                                id: i,
                                sparepart: _.toUpper(data.item_stock),
                                mre: _.toUpper(data.mre_request),
                            })
                        }
                    })
                    if (memo.length > 0) {
                        return _.find(kanban.columns, { id: 2 }).cards.push({
                            id: i,
                            title: `${val.sheet_no} | ${val.mch_no}`,
                            description: _.toUpper(val.memo),
                            memo: memo,
                        })
                    }
                }
            })

            const request_po = _.filter(data, (val, i) => {
                if (val.chk_mark == 'N' && val.request_index.length > 1) {
                    const memo = []
                    _.filter(val.request_index, (data) => {
                        if (
                            data.audit_request === 'N' &&
                            _.startsWith(data.mre_request, 'M') == true
                        ) {
                            return memo.push({
                                sparepart: _.toUpper(data.item_stock),
                                mre: _.toUpper(data.mre_request),
                            })
                        }
                    })

                    if (memo.length > 0) {
                        return _.find(kanban.columns, { id: 3 }).cards.push({
                            id: i,
                            title: `${val.sheet_no} | ${val.mch_no}`,
                            description: _.toUpper(val.memo),
                            memo: memo,
                        })
                    }
                }
            })

            const item_rdy = _.filter(data, (val, i) => {
                if (val.chk_mark == 'N' && val.request_index.length > 1) {
                    const memo = []
                    _.filter(val.request_index, (data) => {
                        if (
                            data.item_ready === 'Y' &&
                            data.audit_request === 'N'
                        ) {
                            return memo.push({
                                sparepart: _.toUpper(data.item_stock),
                                mre: _.toUpper(data.mre_request),
                            })
                        }
                    })

                    if (memo.length > 0) {
                        return _.find(kanban.columns, { id: 4 }).cards.push({
                            id: i,
                            title: `${val.sheet_no} | ${val.mch_no}`,
                            description: _.toUpper(val.memo),
                            memo: memo,
                        })
                    }
                }
            })

            const close = _.filter(data, (val, i) => {
                if (val.chk_mark == 'Y') {
                    return _.find(kanban.columns, { id: 5 }).cards.push({
                        id: i,
                        title: `${val.sheet_no} | ${val.mch_no}`,
                        description: _.toUpper(val.memo),
                        memo: '',
                    })
                }
            })

            // _.forEach(data, (val, index) => {
            //     if (val.chk_mark == 'N' && val.request_index.length < 1) {
            //         const obj = _.find(kanban.columns, { id: 1 })
            //         obj.cards.push({
            //             id: index,
            //             title: `${val.sheet_no} | ${val.mch_no}`,
            //             description: _.toUpper(val.memo),
            //             memo: '',
            //         })
            //     }

            //     if (val.chk_mark == 'N' && val.request_index.length > 0) {
            //         const memo1 = []
            //         const memo2 = []
            //         _.map(val.request_index, (req) => {
            //             if (
            //                 _.startsWith(req.mre_request, 'M') == true &&
            //                 _.isNull(req.date_mre_request) == false
            //             ) {
            //                 memo1.push({
            //                     sparepart: _.toUpper(req.item_stock),
            //                     mre: _.toUpper(req.mre_request),
            //                 })
            //             }
            //             memo2.push({
            //                 sparepart: _.toUpper(req.item_stock),
            //             })
            //         })

            //         const obj1 = _.find(kanban.columns, { id: 3 })
            //         obj1.cards.push({
            //             id: index,
            //             title: `${val.sheet_no} | ${val.mch_no}`,
            //             description: _.toUpper(val.memo),
            //             memo: memo1,
            //         })

            //         const obj2 = _.find(kanban.columns, { id: 2 })
            //         obj2.cards.push({
            //             id: index,
            //             title: `${val.sheet_no} | ${val.mch_no}`,
            //             description: _.toUpper(val.memo),
            //             memo: memo2,
            //         })
            //     }

            //     if (val.chk_mark == 'Y') {
            //         const obj = _.find(kanban.columns, { id: 4 })
            //         obj.cards.push({
            //             id: index,
            //             title: `${val.sheet_no} | ${val.mch_no}`,
            //             description: _.toUpper(val.memo),
            //             memo: '',
            //         })
            //     }
            // })

            return kanban
        }

        if (data.length > 0) {
            return getFilter()
        }
    }
)

export const filterChartErps = createSelector(
    [filteredErps, machinesCom],
    (data, com) => {
        function getChart() {
            const month = getMonthErp()

            const chart = getCountStatusErp(data)

            const x = _.map(month, (val) => {
                return {
                    name: val.substring(0, 3),
                    data: chart[val] || { Open: 0, Close: 0 },
                    kpi: com == 'GM2' ? 120 : 100,
                    title: 'Work Order Chart',
                }
            })

            return x
        }

        if (data) {
            return getChart()
        }
    }
)

/*
 * CREATE CUSTOM SELECTOR FOR REQUEST
 */

const dataUtilsRequestErp = createSelector([dataUtils], (data) => {
    const x = _.filter(data, (val) => {
        if (val.request_index.length > 0) {
            return val
        }
    })

    if (data) {
        return x
    }
})

const dataUtilsRequest = createSelector(
    [selectMnRequests, selectMnMachines, selectMnErps],
    (request, machines, erp) => {
        const x = _.filter(request, (val) => {
            if (val.audit_request !== 'C') {
                return val
            }
        })
        const y = _.map(x, (val) => {
            const erp_index = _.find(erp, { sheet_no: val.sheet_no })
            return {
                ...val,
                mch_index: _.find(machines, {
                    mch_code: val.mch_code,
                    mch_com: val.mch_com,
                }),
                request_index: _.filter(request, { sheet_no: val.sheet_no }),
                ...erp_index,
            }
        })

        if (erp.length > 0) {
            return y
        }
    }
)

//? BY ERP APSHEET
// export const filteredRequestErp = createSelector(
//     [
//         dataUtilsRequestErp,
//         comUtils,
//         erpPrio,
//         machinesSection,
//         machinesResponbility,
//         erpYear,
//     ],
//     (data, com, prio, section, responsible, year) => {
//         function getFilter() {
//             if (
//                 com === 'ALL' &&
//                 responsible === 'ALL' &&
//                 section === 'ALL' &&
//                 year === 'ALL' &&
//                 prio === 'ALL'
//             ) {
//                 return data
//             }
//             return _.filter(data, (val) => {
//                 if (com !== 'ALL' && val.com_no !== com) {
//                     return false
//                 }

//                 if (year !== 'ALL' && dayjs(val.ymd).format('YYYY') !== year) {
//                     return false
//                 }

//                 if (prio !== 'ALL' && val.pri_no !== prio) {
//                     return false
//                 }

//                 if (
//                     section !== 'ALL' &&
//                     section !== 'workshop' &&
//                     val?.mch_index?.section !== section
//                 ) {
//                     return false
//                 }

//                 if (
//                     responsible !== 'ALL' &&
//                     val?.mch_index?.responsible.toLowerCase() !==
//                         responsible.toLowerCase()
//                 ) {
//                     return false
//                 }

//                 //? belum nemu filter workshop find all
//                 if (section == 'workshop') {
//                     return val
//                 }

//                 return val
//             })
//         }

//         if (data) {
//             return getFilter()
//         }
//     }
// )

// export const filteredRequestErpByMonth = createSelector(
//     [filteredRequestErp, searchText, erpMonth],
//     (data, text, month) => {
//         function getFilter() {
//             if (text.length === 0 && month == 'ALL') {
//                 return data
//             }
//             return _.filter(data, (val) => {
//                 if (month && dayjs(val.ymd).format('MMMM') !== month) {
//                     return false
//                 }

//                 return val?.sheet_no.toLowerCase().includes(text.toLowerCase())
//             })
//         }
//         if (data) {
//             return getFilter()
//         }
//     }
// )

//? BY APREQUEST

export const filteredRequest = createSelector(
    [
        dataUtilsRequest,
        erpYear,
        erpPrio,
        machinesCom,
        machinesSection,
        machinesResponbility,
        reqStatus,
    ],
    (data, year, prio, com, section, responsible, status) => {
        function getFilter() {
            if (
                com === 'ALL' &&
                responsible === 'ALL' &&
                section === 'ALL' &&
                year === 'ALL' &&
                prio === 'ALL' &&
                status === 'ALL'
            ) {
                return data
            }
            return _.filter(data, (val) => {
                if (com !== 'ALL' && val.mch_com !== com) {
                    return false
                }

                if (
                    year !== 'ALL' &&
                    dayjs(val.createdAt).format('YYYY') !== year
                ) {
                    return false
                }

                if (prio !== 'ALL' && val?.pri_no !== prio) {
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

                if (section === 'workshop') {
                    return (
                        val.pri_no == '04' ||
                        val.pri_no == '05' ||
                        val.pri_no == '07'
                    )
                }

                if (status === 'Ready') {
                    return val.item_ready === 'Y' && val.audit_request === 'N'
                }

                if (status === 'Unaudit') {
                    return (
                        val.audit_request === 'N' &&
                        val.item_ready === 'N' &&
                        val.mre_request.length === 0
                    )
                }

                if (status === 'MRE') {
                    return (
                        val.mre_request.length > 0 &&
                        val.audit_request === 'N' &&
                        val.item_ready === 'N'
                    )
                }

                if (status === 'Audit') {
                    return val.audit_request === 'Y'
                }

                return val
            })
        }

        if (data) {
            return getFilter()
        }
    }
)

export const filteredRequestByMonth = createSelector(
    [filteredRequest, searchText, erpMonth],
    (data, text, month) => {
        function getFilter() {
            if (text.length === 0) {
                return data
            }
            return _.filter(data, (val) => {
                if (
                    month !== 'ALL' &&
                    dayjs(val.createdAt).format('MMMM') !== month
                ) {
                    return false
                }

                if (
                    (month &&
                        !_.isUndefined(val.sheet_no) &&
                        val.sheet_no
                            .toLowerCase()
                            .includes(text.toLowerCase())) ||
                    (!_.isNull(val.item_stock) &&
                        val.item_stock
                            .toLowerCase()
                            .includes(text.toLowerCase())) ||
                    (!_.isUndefined(val.mch_code) &&
                        val.mch_code
                            .toLowerCase()
                            .includes(text.toLowerCase())) ||
                    (!_.isUndefined(val.user_req1) &&
                        val.user_req1
                            .toLowerCase()
                            .includes(text.toLowerCase())) ||
                    (!_.isUndefined(val.mre_request) &&
                        val.mre_request
                            .toLowerCase()
                            .includes(text.toLowerCase()))
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

export const filteredRequestChart = createSelector(
    [filteredRequest],
    (data) => {
        function getChart() {
            const month = getMonthErp()

            const chart = getCountStatusRequest(data)

            const x = _.map(month, (val) => {
                return {
                    name: val.substring(0, 3),
                    data: chart[val] || { Open: 0, Close: 0 },
                    kpi: '',
                    title: 'Request Sparepart Chart',
                }
            })

            return x
        }

        if (data) {
            return getChart()
        }
    }
)

/*
 * END OF CUSTOM SELECTOR
 */

export const {
    setErpDepNo,
    setErpYear,
    setSearchText,
    setErpPrio,
    setErpMonth,
    setReqStatus,
} = erpMnSlices.actions

export default erpMnSlices.reducer
