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
import { getMonthScw, getCountStatusScw } from './scwUtils'
import { Title } from '@mui/icons-material'

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
export const scwCom = ({ pdApp }) => pdApp.scws.scwCom
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
    [selectScws, scwYear, scwCom, searchText, status],
    (data, year, com, text, status) => {
        function getFilter() {
            if (
                text.length === 0 &&
                year === 'ALL' &&
                com === 'ALL' &&
                status === 'ALL'
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

                if (com !== 'ALL' && val.com !== com) {
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
            return getFilter()
        }
    }
)

export const filteredScwChartOpenClose = createSelector(
    [filteredScw],
    (data) => {
        function getChart() {
            const month = getMonthScw()

            const chart = getCountStatusScw(data)

            const x = _.map(month, (val) => {
                return {
                    name: val.substring(0, 3),
                    data: chart[val] || { Open: 0, Close: 0 },
                    title: 'Production SCW Chart',
                }
            })

            return x
        }

        if (data) {
            return getChart()
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
        scwMonth: 'January',
        pending: false,
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

export const { setScwCom, setScwYear, setSearchText, setScwStatus } =
    scwProductionSlices.actions

export default scwProductionSlices.reducer
