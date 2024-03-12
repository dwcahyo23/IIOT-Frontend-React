import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { saveScw, updateScw, removeScw } from './scwProductionSlice'
import _ from 'lodash'
import dayjs from 'dayjs'
import {
    getMonthScw,
    getCountStatusScw,
    getCountDeptChart,
    getDateofMonth,
    getCountStatusOfDate,
} from './scwUtils'

export const getScwSlices = createAsyncThunk('pdApp/scw/getScws', async () => {
    const response = await axios.get(`http://192.168.192.7:5000/ProductionScw`)

    const data = await response.data

    return data
})

const ScwAdapter = createEntityAdapter({
    selectId: (data) => data.uuid,
    // sortComparer: (a, b) => a.sheet_no.localeCompare(b.sheet_no),
    sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),

    // obj.sort((a, b) => b.localeCompare(a) )
})

export const { selectAll: selectScws, selectById: selectScwById } =
    ScwAdapter.getSelectors((state) => state.pdApp.scws)

// * CREATE SELECTOR

export const searchText = ({ pdApp }) => pdApp.scws.searchText
export const status = ({ pdApp }) => pdApp.scws.status
export const scwYear = ({ pdApp }) => pdApp.scws.scwYear
export const scwMonth = ({ pdApp }) => pdApp.scws.scwMonth
export const scwCom = ({ pdApp }) => pdApp.scws.scwCom
export const scwDept = ({ pdApp }) => pdApp.scws.scwDept
export const scwPending = ({ pdApp }) => pdApp.scws.pending

export const selectScwYear = createSelector([selectScws], (data) => {
    const x = _(data)
        .groupBy((val) => dayjs(val.createdAt).format('YYYY'))
        .keys()
        .push('ALL')
        .sort()
        .value()

    return x
})

export const selectScwMonth = createSelector(() => {
    const x = getMonthScw()
    x.unshift('ALL')
    return x
})

export const selectScwCom = createSelector([selectScws], (data) => {
    const x = _(data)
        .groupBy((val) => val.com)
        .keys()
        .push('ALL')
        .sort()
        .value()

    return x
})

export const filteredScw = createSelector(
    [selectScws, scwYear, scwMonth, scwCom, scwDept, searchText, status],
    (data, year, month, com, dept, text, status) => {
        function getFilter() {
            if (
                text.length === 0 &&
                year === 'ALL' &&
                month === 'ALL' &&
                com === 'ALL' &&
                status === 'ALL' &&
                dept === 'ALL'
            ) {
                return data
            }
            return _.filter(data, (val) => {
                if (
                    year !== 'ALL' &&
                    dayjs(val.createdAt).format('YYYY') !== year
                ) {
                    return false
                }

                if (
                    month !== 'ALL' &&
                    dayjs(val.createdAt).format('MMMM') !== month
                ) {
                    return false
                }

                if (com !== 'ALL' && val.com !== com) {
                    return false
                }

                if (dept !== 'ALL' && val.req_to !== dept) {
                    return false
                }

                if (status !== 'ALL' && val.status !== status) {
                    return false
                }

                if (
                    !_.isUndefined(val.problem) &&
                    val.problem.toLowerCase().includes(text.toLowerCase())
                ) {
                    return val
                }
            })
        }

        if (data) {
            getDateofMonth(month)
            return getFilter()
        }
    }
)

export const filteredScwChartOpenClose = createSelector(
    [filteredScw],
    (data) => {
        function getChart() {
            const chart = getCountStatusScw(data)

            const month = getMonthScw()

            const x = _.map(month, (val) => {
                return {
                    name: val.substring(0, 3),
                    data: chart[val] || { Open: 0, Close: 0, OnProgress: 0 },
                    title: 'Monthly SCW Chart',
                }
            })

            return x
        }

        if (data) {
            return getChart()
        }
    }
)

export const filteredScwChartDateOfMonth = createSelector(
    [filteredScw, scwMonth],
    (data, month) => {
        function getChart() {
            const date = getDateofMonth(month)

            const chart = getCountStatusOfDate(data)

            const x = _.map(date, (val) => {
                return {
                    name: val.substring(0, 3),
                    data: chart[val] || { Open: 0, Close: 0, OnProgress: 0 },
                    title: 'Daily SCW Chart',
                }
            })

            return x
        }

        if (data) {
            return getChart()
        }
    }
)

export const filterScwChartDept = createSelector(
    [selectScws, scwYear, scwMonth, scwCom],
    (data, year, month, com) => {
        function getFilter() {
            if (year === 'ALL' && scwMonth === 'ALL' && com === 'ALL') {
                return data
            }
            return _.filter(data, (val) => {
                if (
                    year !== 'ALL' &&
                    dayjs(val.createdAt).format('YYYY') !== year
                ) {
                    return false
                }

                if (
                    month !== 'ALL' &&
                    dayjs(val.createdAt).format('MMMM') !== month
                ) {
                    return false
                }

                if (com !== 'ALL' && val.com !== com) {
                    return false
                }

                return val
            })
        }

        if (data) {
            return getFilter()
        }
    }
)

// * END SELECTOR

const scwProductionSlices = createSlice({
    name: 'pdApp/scws',
    initialState: ScwAdapter.getInitialState({
        searchText: '',
        scwCom: 'ALL',
        scwYear: 'ALL',
        scwMonth: 'ALL',
        pending: false,
        scwDept: 'ALL',
        status: 'ALL',
    }),
    reducers: {
        setScwCom: {
            reducer: (state, action) => {
                state.scwCom = action.payload
            },
            prepare: (event) => {
                return { payload: event }
            },
        },
        setScwYear: {
            reducer: (state, action) => {
                state.scwYear = action.payload
            },
            prepare: (event) => {
                return { payload: event }
            },
        },
        setScwMonth: {
            reducer: (state, action) => {
                state.scwMonth = action.payload
            },
            prepare: (event) => {
                return { payload: event }
            },
        },
        setScwDept: {
            reducer: (state, action) => {
                state.scwDept = action.payload
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
        setScwStatus: {
            reducer: (state, action) => {
                state.status = action.payload
            },
            prepare: (event) => ({ payload: event }),
        },
    },
    extraReducers: {
        [getScwSlices.fulfilled]: (state, action) => {
            state.pending = false
            ScwAdapter.setAll(state, action.payload)
        },
        [getScwSlices.pending]: (state, action) => {
            state.pending = true
        },
        [saveScw.fulfilled]: ScwAdapter.addOne,
        [updateScw.fulfilled]: ScwAdapter.upsertOne,
        [removeScw.fulfilled]: (state, action) =>
            ScwAdapter.removeOne(state, action.payload),
    },
})

export const {
    setScwCom,
    setScwYear,
    setScwMonth,
    setSearchText,
    setScwStatus,
    setScwDept,
} = scwProductionSlices.actions

export default scwProductionSlices.reducer
