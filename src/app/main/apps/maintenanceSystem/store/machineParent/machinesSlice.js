import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getMachines = createAsyncThunk(
    'maintenanceSystem/machines/getMachines',
    async () => {
        const response = await axios.get(
            'http://192.168.129.7:5000/maintenanceMachine'
        )
        const data = await response.data
        return data
    }
)

const machinesAdapter = createEntityAdapter({
    selectId: (data) => data.uuid,
})

export const { selectAll: selectMachines, selectById: selectMachinesById } =
    machinesAdapter.getSelectors((state) => state.maintenanceSystem.machines)

const machinesSlice = createSlice({
    name: 'maintenanceSystem/machines',
    initialState: machinesAdapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getMachines.fulfilled]: machinesAdapter.setAll,
    },
})

export default machinesSlice.reducer
