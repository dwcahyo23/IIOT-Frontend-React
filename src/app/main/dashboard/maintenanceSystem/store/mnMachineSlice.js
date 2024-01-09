import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getMnMachineSlice = createAsyncThunk(
    'dashboard/MNMachine/getMnMachineSlice',
    async () => {
        const response = await axios.get(
            'http://192.168.192.7:5000/maintenanceMachine'
        )
        const data = await response.data
        return data
    }
)

const Adapter = createEntityAdapter({
    selectId: (data) => data.uuid,
})

export const { selectAll: selectMnMachine, selectById: selectMnMachineById } =
    Adapter.getSelectors((state) => state.dashboard.MNMachine)

const mnMachineSlice = createSlice({
    name: 'dashboard/MNMachine',
    initialState: Adapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getMnMachineSlice.fulfilled]: Adapter.setAll,
    },
})

export default mnMachineSlice.reducer
