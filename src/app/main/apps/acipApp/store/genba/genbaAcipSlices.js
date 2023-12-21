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

export const selectGenbasCom = ({ genbaAcip }) => genbaAcip.genbas.genbasCom

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

export const selectFilteredGenbasCom = createSelector(
    [selectGenbasAcip, selectGenbasCom],
    (genbas, genbasCom) => {
        if (genbasCom == 'ALL') {
            return genbas
        }
        return _.filter(genbas, { com: genbasCom })
    }
)

export const selectChartFilteredGenbasCom = createSelector(
    [selectFilteredGenbasCom],
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

const genbaAcipSlices = createSlice({
    name: 'genbaAcip/genbas',
    initialState: genbasAcipAdapter.getInitialState({
        genbasCom: 'ALL',
    }),
    reducers: {
        setGenbasCom: {
            reducer: (state, action) => {
                state.genbasCom = action.payload
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

export const { setGenbasCom } = genbaAcipSlices.actions

export default genbaAcipSlices.reducer
