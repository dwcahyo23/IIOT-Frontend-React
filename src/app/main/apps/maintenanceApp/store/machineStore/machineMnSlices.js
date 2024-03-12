import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { saveMachine, removeMachine } from './machineMnSlice'
import _ from 'lodash'

export const getMachineMnSlices = createAsyncThunk(
    'mnApp/machines/getMachines',
    async () => {
        const response = await axios.get(`http://192.168.192.7:5000/mnmachine`)

        const data = await response.data

        return data
    }
)

const MnMachineAdapter = createEntityAdapter({
    selectId: (data) => data.uuid,
    sortComparer: (a, b) => a.mch_code.localeCompare(b.mch_code),
})

export const { selectAll: selectMnMachines, selectById: selectMnMachinesById } =
    MnMachineAdapter.getSelectors((state) => state.mnApp.machines)

/*
 * CREATE CUSTOM SELECTOR
 */

export const machinesCom = ({ mnApp }) => mnApp.machines.machinesCom
export const machinesProcess = ({ mnApp }) => mnApp.machines.machinesProcess
export const searchText = ({ mnApp }) => mnApp.machines.searchText
export const machinesSection = ({ mnApp }) => mnApp.machines.machinesSection
export const machinesResponbility = ({ mnApp }) =>
    mnApp.machines.machinesResponbility

export const selectMachinesCom = createSelector([selectMnMachines], (data) => {
    const x = _(data).groupBy('mch_com').keys().push('ALL').sort().value()

    return x
})

export const selectMachinesProcess = createSelector(
    [selectMnMachines, machinesCom],
    (data, com) => {
        const x = _(data)
            .filter({ mch_com: com })
            .groupBy('mch_process_type')
            .keys()
            .push('ALL')
            .sort()
            .value()

        return x
    }
)

export const selectMachinesResponbility = createSelector(
    [selectMnMachines, machinesCom, machinesSection],
    (data, com, section) => {
        const x = _(data)
            .filter(
                (val) => val.mch_com == com && val.section == _.toLower(section)
            )
            .groupBy('responsible')
            .keys()
            .push('ALL')
            .sort()
            .map((val) => val.toUpperCase())
            .value()

        return x
    }
)

export const filteredMachines = createSelector(
    [selectMnMachines, machinesCom, machinesProcess, searchText],
    (data, com, proces, text) => {
        function getFilter() {
            if (text.length === 0 && com === 'ALL' && proces === 'ALL') {
                return data
            }
            return _.filter(data, (val) => {
                if (com !== 'ALL' && val.mch_com !== com) {
                    return false
                }

                if (proces !== 'ALL' && val.mch_process_type !== proces) {
                    return false
                }

                return val?.mch_code.toLowerCase().includes(text.toLowerCase())
            })
        }

        if (data) {
            return getFilter()
        }
    }
)
/*
 * END OF CUSTOM SELECTOR
 */

const machineMnSlices = createSlice({
    name: 'mnApp/machines',
    initialState: MnMachineAdapter.getInitialState({
        machinesCom: 'ALL',
        machinesProcess: 'ALL',
        searchText: '',
        machinesSection: 'ALL',
        machinesResponbility: 'ALL',
    }),
    reducers: {
        setMachinesCom: {
            reducer: (state, action) => {
                state.machinesCom = action.payload
            },
            prepare: (event) => {
                return { payload: event }
            },
        },
        setMachinesProcess: {
            reducer: (state, action) => {
                state.machinesProcess = action.payload
            },
            prepare: (event) => {
                return { payload: event }
            },
        },
        setMachinesSection: {
            reducer: (state, action) => {
                state.machinesSection = action.payload
            },
            prepare: (event) => {
                return { payload: event }
            },
        },
        setMachinesResponbility: {
            reducer: (state, action) => {
                state.machinesResponbility = action.payload
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
        [getMachineMnSlices.fulfilled]: MnMachineAdapter.setAll,
        [saveMachine.fulfilled]: MnMachineAdapter.upsertOne,
        [removeMachine.fulfilled]: (state, action) =>
            MnMachineAdapter.removeOne(state, action.payload),
    },
})

export const {
    setMachinesCom,
    setMachinesProcess,
    setSearchText,
    setMachinesSection,
    setMachinesResponbility,
} = machineMnSlices.actions

export default machineMnSlices.reducer
