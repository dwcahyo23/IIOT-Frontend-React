import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getMachineCode = createAsyncThunk(
    'maintenanceApp/machineCode/getMachineCode',
    async () => {
        const response = await axios.get('http://192.168.192.7:5000/machines')
        const data = await response.data

        return data
    }
)

const machinesAdapter = createEntityAdapter({
    selectId: (machine) => machine.uuid,
})

export const {
    selectAll: selectMachineCode,
    selectById: selectMachineCodeById,
} = machinesAdapter.getSelectors((state) => state.maintenanceApp.machineCode)

const machinesSlice = createSlice({
    name: 'maintenanceApp/machineCode',
    initialState: machinesAdapter.getInitialState({
        searchText: '',
    }),
    reducers: {
        setMachinesSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload
            },
            prepare: (event) => ({ payload: event.target.value || '' }),
        },
    },
    extraReducers: {
        [getMachineCode.fulfilled]: machinesAdapter.setAll,
    },
})

export const { setMachinesSearchText } = machinesSlice.actions

export const selectMachinesSearchText = ({ maintenanceApp }) =>
    maintenanceApp.items.searchText

export default machinesSlice.reducer
