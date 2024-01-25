import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getMachine = createAsyncThunk(
    'mnApp/machine/getMachine',
    async (uuid) => {
        const response = await axios.get(
            `http://192.168.192.7:5000/mnmachineid/${uuid}`
        )

        const data = await response.data

        return data
    }
)

export const saveMachine = createAsyncThunk(
    'mnApp/machine/saveMachine',
    async (row, { dispatch, getState }) => {
        try {
            const response = await axios.patch(
                `http://192.168.192.7:5000/mnmachineid/${row.uuid}`,
                row
            )
            const data = await response.data

            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const removeMachine = createAsyncThunk(
    'mnApp/machine/removeMachine',
    async (uuid, { dispatch, getState }) => {
        const response = await axios.delete(
            `http://192.168.192.7:5000/mnmachineid/${uuid}`
        )

        await response.data

        return uuid
    }
)

const machineMnSlice = createSlice({
    name: 'mnApp/machine',
    initialState: {
        pending: false,
    },
    reducers: {},
    extraReducers: {
        [getMachine.fulfilled]: (state, action) => action.payload,
        [saveMachine.fulfilled]: (state, action) => action.payload,
        [removeMachine.fulfilled]: (state, action) => null,
    },
})

export const selectMachine = ({ mnApp }) => mnApp.machine

export default machineMnSlice.reducer
