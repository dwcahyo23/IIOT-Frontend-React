import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getMachineStock = createAsyncThunk(
    'maintenanceSystem/stock/getMachineStock',
    async () => {
        const response = await axios.get(
            'http://192.168.192.7:5000/maintenanceStock'
        )
        const data = await response.data
        return data
    }
)

const stockAdapter = createEntityAdapter({
    selectId: (data) => data.uuid,
})

export const { selectAll: selectStock, selectById: selectStockById } =
    stockAdapter.getSelectors((state) => state.maintenanceSystem.stock)

const machineStock = createSlice({
    name: 'maintenanceSystem/stock',
    initialState: stockAdapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getMachineStock.fulfilled]: stockAdapter.setAll,
    },
})

export default machineStock.reducer
