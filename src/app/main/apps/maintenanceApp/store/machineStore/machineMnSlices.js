import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { saveMachine, removeMachine } from './machineMnSlice'

export const getMachineMnSlices = createAsyncThunk(
    'mnApp/machines/getMachines',
    async () => {
        const response = await axios.get(`http://localhost:5000/mnmachine`)

        const data = await response.data

        return data
    }
)

const MnMachineAdapter = createEntityAdapter({
    selectId: (data) => data.uuid,
})

export const { selectAll: selectMnMachines, selectById: selectMnMachinesById } =
    MnMachineAdapter.getSelectors((state) => state.mnApp.machines)

/*
 * CREATE CUSTOM SELECTOR
 */

export const machinesCom = ({ mnApp }) => mnApp.machines.machinesCom

export const machinesProcess = ({ mnApp }) => mnApp.machines.machinesProcess

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

/*
 * END OF CUSTOM SELECTOR
 */

const machineMnSlices = createSlice({
    name: 'mnApp/machines',
    initialState: MnMachineAdapter.getInitialState({
        machinesCom: 'ALL',
        machinesProcess: 'ALL',
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
    },
    extraReducers: {
        [getMachineMnSlices.fulfilled]: MnMachineAdapter.setAll,
        [saveMachine.fulfilled]: MnMachineAdapter.upsertOne,
        [removeMachine.fulfilled]: (state, action) =>
            MnMachineAdapter.removeOne(state, action.payload),
    },
})

export const { setMachinesCom, setMachinesProcess } = machineMnSlices.actions

export default machineMnSlices.reducer
