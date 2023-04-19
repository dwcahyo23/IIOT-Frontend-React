import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getMachines = createAsyncThunk(
    'maintenanceApp/machines/getMachines',
    async () => {
        const response = await axios.get('http://192.168.192.7:5000/finItem')
        const data = await response.data
        return data
    }
)

const machinesAdapter = createEntityAdapter({
    selectId: (machines) => machines.uuid,
})

export const { selectAll: selectMachines, selectById: selectMachinesById } =
    machinesAdapter.getSelectors((state) => state.maintenanceApp.machines)

const machinesSlice = createSlice({
    name: 'maintenanceApp/machines',
    initialState: machinesAdapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getMachines.fulfilled]: machinesAdapter.setAll,
    },
})

export default machinesSlice.reducer
