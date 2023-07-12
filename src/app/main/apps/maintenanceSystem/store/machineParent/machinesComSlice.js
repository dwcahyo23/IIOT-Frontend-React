import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getMachinesCom = createAsyncThunk(
    'maintenanceSystem/com/getMachinesCom',
    async () => {
        const response = await axios.get(
            'http://192.168.192.7:5000/maintenanceMachineCom'
        )
        const data = await response.data
        return data
    }
)

const comAdapter = createEntityAdapter({
    selectId: (data) => data.uuid,
})

export const { selectAll: selectCom, selectById: selectComById } =
    comAdapter.getSelectors((state) => state.maintenanceSystem.com)

const machinesComSlice = createSlice({
    name: 'maintenanceSystem/com',
    initialState: comAdapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getMachinesCom.fulfilled]: comAdapter.setAll,
    },
})

export default machinesComSlice.reducer
