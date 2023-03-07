import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getMachines = createAsyncThunk(
    'mnPreventiveApp/machines/getMachines',
    async () => {
        const response = await axios.get('http://localhost:5000/machines')
        const data = await response.data

        return data
    }
)

export const removeMachines = createAsyncThunk(
    'mnPreventiveApp/machines',
    async (itemsIds, { dispatch, getState }) => {
        await axios.delete('http://localhost:5000/machines', { data: itemsIds })

        return itemsIds
    }
)

const machinesAdapter = createEntityAdapter({
    selectId: (machine) => machine.uuid,
})

export const { selectAll: selectMachines, selectById: selectMachinesById } =
    machinesAdapter.getSelectors((state) => state.mnPreventiveApp.machines)

const machinesSlice = createSlice({
    name: 'mnPreventiveApp/machines',
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
        [getMachines.fulfilled]: machinesAdapter.setAll,
    },
})

export const { setMachinesSearchText } = machinesSlice.actions

export const selectMachinesSearchText = ({ mnPreventiveApp }) =>
    mnPreventiveApp.items.searchText

export default machinesSlice.reducer
