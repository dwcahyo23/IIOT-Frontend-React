import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getMachinesProcess = createAsyncThunk(
    'maintenanceSystem/process/maintenanceMachineProcess',
    async () => {
        const response = await axios.get(
            'http://192.168.129.7:5000/maintenanceMachineProcess'
        )
        const data = await response.data
        return data
    }
)

const processAdapter = createEntityAdapter({
    selectId: (data) => data.uuid,
})

export const { selectAll: selectProcess, selectById: selectProcessById } =
    processAdapter.getSelectors((state) => state.maintenanceSystem.process)

const machinesProcessSlice = createSlice({
    name: 'maintenanceSystem/process',
    initialState: processAdapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getMachinesProcess.fulfilled]: processAdapter.setAll,
    },
})

export default machinesProcessSlice.reducer
