import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getModbus = createAsyncThunk(
    'mnElectricityApp/modbus/getModbus',
    async () => {
        const response = await axios.get('http://localhost:5000/modbus')
        const data = await response.data
        return data
    }
)

const modbusAdapter = createEntityAdapter({
    selectId: (modbus) => modbus.uuid,
})

export const { selectAll: selectModbuses, selectById: selectModbusById } =
    modbusAdapter.getSelectors((state) => state.mnElectricityApp.modbus)

const modbusSlice = createSlice({
    name: 'mnElectricityApp/modbus',
    initialState: modbusAdapter.getInitialState({ searchText: '' }),
    reducers: {
        setItemsSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload
            },
            prepare: (event) => ({ payload: event.target.value || '' }),
        },
        fetchData: {},
    },
    extraReducers: {
        [getModbus.fulfilled]: modbusAdapter.setAll,
    },
})

export const { setItemsSearchText } = modbusSlice.actions

export const selectItemsSearchText = ({ mnElectricityApp }) =>
    mnElectricityApp.modbus.searchText

export default modbusSlice.reducer
