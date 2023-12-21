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
        const response = await axios.get(`http://192.168.192.7:5000/genbaAcip`)

        const data = await response.data

        return data
    }
)

const genbasAcipAdapter = createEntityAdapter({
    selectId: (data) => data.id_genba,
})

export const { selectAll: selectGenbasAcip, selectById: selectGenbasAcipById } =
    genbasAcipAdapter.getSelectors((state) => state.genbaAcip.genbas)

const selectGenbasCom = ({ genbaAcip }) => genbaAcip.genbas.genbasCom

const selectGenbaDept = ({ genbaAcip }) => genbaAcip.genbas.genbasDept

const selectGenbaArea = ({ genbaAcip }) => genbaAcip.genbas.genbasArea

const searchText = ({ genbaAcip }) => genbaAcip.genbas.searchText

const selectStatus = ({ genbaAcip }) => genbaAcip.genbas.genbasStatus

export const selectFilteredGenbas = createSelector(
    [
        selectGenbasAcip,
        searchText,
        selectGenbasCom,
        selectGenbaDept,
        selectGenbaArea,
        selectStatus,
    ],
    (genbas, searchText, genbasCom, genbasDept, genbasArea, status) => {
        console.log(searchText, status)
        function getFilter() {
            if (
                searchText.length === 0 &&
                genbasCom === 'ALL' &&
                genbasDept === 'ALL' &&
                genbasArea === 'ALL' &&
                !status
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

                if (genbasArea !== 'ALL' && val.area !== genbasArea) {
                    return false
                }

                if (val.status !== status) {
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
        searchText,
        selectGenbasCom,
        selectGenbaDept,
        selectGenbaArea,
        selectStatus,
    ],
    (genbas, searchText, genbasCom, genbasDept, genbasArea, status) => {
        console.log(searchText, status)
        function getFilter() {
            if (
                searchText.length === 0 &&
                genbasCom === 'ALL' &&
                genbasDept === 'ALL' &&
                genbasArea === 'ALL'
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

                if (genbasArea !== 'ALL' && val.area !== genbasArea) {
                    return false
                }

                if (val.status !== status) {
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

export const selectChartFilteredGenbasCom = createSelector(
    [selectFilteredGenbasForChart],
    (genbas) => {
        function getChart() {
            const month = getMonthAcip()

            const chart = getCountStatusAcip(genbas)

            const x = _.map(month, (val) => {
                return { name: val, data: chart[val] || { Open: 0, Close: 0 } }
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
        genbasStatus: 'Open',
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
} = genbaAcipSlices.actions

export default genbaAcipSlices.reducer
