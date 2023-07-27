import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getMachines = createAsyncThunk(
    'modbusApp/machines/getMachines',
    async () => {
        const response = await axios.get(
            'http://localhost:5000/getResultAddress'
        )
        const data = await response.data
        return data
    }
)

const machinesAdapter = createEntityAdapter({
    selectId: (machines) => machines.uuid,
})

export const { selectAll: selectMachines, selectById: selectMachinesById } =
    machinesAdapter.getSelectors((state) => state.modbusApp.machines)

const machinesSlice = createSlice({
    name: 'modbusApp/machines',
    initialState: machinesAdapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getMachines.fulfilled]: machinesAdapter.setAll,
    },
})

export default machinesSlice.reducer
