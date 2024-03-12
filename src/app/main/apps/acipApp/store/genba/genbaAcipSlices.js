import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'
import _ from 'lodash'
import dayjs from 'dayjs'
import moment from 'moment'
import { saveGenbaAcip, removeGenbaAcip } from './genbaAcipSlice'
import { getMonthAcip, getCountStatusAcip } from '../../utils/acipUtils'
import FuseUtils from '@fuse/utils/FuseUtils'

export const getGenbasAcip = createAsyncThunk(
    'genbaAcip/genbas/getGenbasAcip',
    async () => {
        const response = await axios.get(`http://localhost:5000/genbaAcip`)

        const data = await response.data

        return data
    }
)

const genbasAcipAdapter = createEntityAdapter({
    selectId: (data) => data.id_genba,
})

export const { selectAll: selectGenbasAcip, selectById: selectGenbasAcipById } =
    genbasAcipAdapter.getSelectors((state) => state.genbaAcip.genbas)

export const selectGenbasCom = ({ genbaAcip }) => genbaAcip.genbas.genbasCom

export const selectGenbaDept = ({ genbaAcip }) => genbaAcip.genbas.genbasDept

export const selectGenbaArea = ({ genbaAcip }) => genbaAcip.genbas.genbasArea

export const selectGenbaYear = ({ genbaAcip }) => genbaAcip.genbas.genbasYear

export const searchText = ({ genbaAcip }) => genbaAcip.genbas.searchText

export const selectGenbasStatus = ({ genbaAcip }) =>
    genbaAcip.genbas.genbasStatus

export const selectFilteredGenbas = createSelector(
    [
        selectGenbasAcip,
        searchText,
        selectGenbasCom,
        selectGenbaDept,
        selectGenbaArea,
        selectGenbasStatus,
        selectGenbaYear,
    ],
    (genbas, searchText, genbasCom, genbasDept, genbasArea, status, year) => {
        function getFilter() {
            if (
                searchText.length === 0 &&
                genbasCom === 'ALL' &&
                genbasDept === 'ALL' &&
                genbasArea === 'ALL' &&
                year === 'ALL' &&
                status === 'ALL'
            ) {
                return genbas
            }
            return _.filter(genbas, (val) => {
                if (genbasCom !== 'ALL' && val.com !== genbasCom) {
                    return false
                }

                if (genbasDept !== 'ALL' && val.dept !== genbasDept) {
                    return false
                }

                if (
                    year !== 'ALL' &&
                    dayjs(val.createdAt).format('YYYY') !== year
                ) {
                    return false
                }

                if (genbasArea !== 'ALL' && val.area !== genbasArea) {
                    return false
                }

                if (status !== 'ALL' && val.status !== status) {
                    return false
                }

                return val?.sheet
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
            })
        }

        if (genbas) {
            // console.log(getFilter())
            return getFilter()
        }
    }
)

export const selectFilteredGenbasForChart = createSelector(
    [
        selectGenbasAcip,
        selectGenbasCom,
        selectGenbaDept,
        selectGenbaArea,
        selectGenbaYear,
    ],
    (genbas, genbasCom, genbasDept, genbasArea, year) => {
        function getFilter() {
            if (
                genbasCom === 'ALL' &&
                genbasDept === 'ALL' &&
                genbasArea === 'ALL' &&
                year === 'ALL'
            ) {
                return genbas
            }
            return _.filter(genbas, (val) => {
                if (genbasCom !== 'ALL' && val.com !== genbasCom) {
                    return false
                }

                if (
                    year !== 'ALL' &&
                    dayjs(val.createdAt).format('YYYY') !== year
                ) {
                    return false
                }

                if (genbasDept !== 'ALL' && val.dept !== genbasDept) {
                    return false
                }

                if (genbasArea !== 'ALL' && val.area !== genbasArea) {
                    return false
                }

                return val
            })
        }

        if (genbas) {
            // console.log(getFilter())
            return getFilter()
        }
    }
)

export const selectChartFilteredGenbasCom = createSelector(
    [selectFilteredGenbasForChart],
    (genbas) => {
        function getChart() {
            const month = getMonthAcip()

            const chart = getCountStatusAcip(genbas)

            const x = _.map(month, (val) => {
                return {
                    name: val.substring(0, 3),
                    data: chart[val] || { Open: 0, Close: 0 },
                }
            })

            return x
        }

        if (genbas) {
            // console.log(getChart())
            return getChart()
        }
    }
)

//? Static Com Dept

export const selectGenbasUseCom = createSelector(
    [selectGenbasAcip],
    (genbas) => {
        const com = _(genbas)
            .groupBy('com')
            .keys()
            .pull('N/A')
            .push('ALL')
            .sort()
            .value()

        return com
    }
)

export const selectGenbasUseYear = createSelector(
    [selectGenbasAcip],
    (genbas) => {
        const x = _(genbas)
            .groupBy((val) => dayjs(val.createdAt).format('YYYY'))
            .keys()
            .push('ALL')
            .sort()
            .value()

        return x
    }
)

export const selectGenbasUseDept = createSelector(
    [selectGenbasAcip, selectGenbasCom],
    (genbas, isCom) => {
        const dept = _(genbas)
            .filter({ com: isCom })
            .groupBy('dept')
            .keys()
            .push('ALL')
            .sort()
            .value()

        return dept
    }
)

export const selectGenbasUseArea = createSelector(
    [selectGenbasAcip, selectGenbasCom, selectGenbaDept],
    (genbas, isCom, isDept) => {
        const area = _(genbas)
            .filter({ com: isCom, dept: isDept })
            .groupBy('area')
            .keys()
            .push('ALL')
            .sort()
            .value()

        return area
    }
)

const genbaAcipSlices = createSlice({
    name: 'genbaAcip/genbas',
    initialState: genbasAcipAdapter.getInitialState({
        genbasCom: 'ALL',
        genbasDept: 'ALL',
        genbasArea: 'ALL',
        searchText: '',
        genbasStatus: 'ALL',
        genbasYear: 'ALL',
    }),
    reducers: {
        setGenbasCom: {
            reducer: (state, action) => {
                state.genbasCom = action.payload
            },
            prepare: (event) => {
                return { payload: event }
            },
        },
        setGenbasDept: {
            reducer: (state, action) => {
                state.genbasDept = action.payload
            },
            prepare: (event) => ({ payload: event }),
        },
        setGenbasArea: {
            reducer: (state, action) => {
                state.genbasArea = action.payload
            },
            prepare: (event) => ({ payload: event }),
        },
        setGenbasStatus: {
            reducer: (state, action) => {
                state.genbasStatus = action.payload
            },
            prepare: (event) => ({ payload: event }),
        },
        setSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload
            },
            prepare: (event) => ({ payload: event }),
        },
        setGenbasYear: {
            reducer: (state, action) => {
                state.genbasYear = action.payload
            },
            prepare: (event) => ({ payload: event }),
        },
    },
    extraReducers: {
        [getGenbasAcip.fulfilled]: genbasAcipAdapter.setAll,
        [saveGenbaAcip.fulfilled]: genbasAcipAdapter.upsertOne,
        [removeGenbaAcip.fulfilled]: (state, action) =>
            genbasAcipAdapter.removeOne(state, action.payload),
    },
})

export const {
    setGenbasCom,
    setGenbasDept,
    setGenbasArea,
    setSearchText,
    setGenbasStatus,
    setGenbasYear,
} = genbaAcipSlices.actions

export default genbaAcipSlices.reducer
