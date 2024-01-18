import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { create } from 'lodash'

export const getScw = createAsyncThunk('pdApp/scw/getScw', async (uuid) => {
    const response = await axios.get(
        `http://192.168.192.7:5000/ProductionSCW/${uuid}`
    )

    const data = await response.data

    return data
})

export const updateScw = createAsyncThunk(
    'pdApp/scw/updateScw',
    async (row, { dispatch, getState, rejectWithValue }) => {
        try {
            const response = await axios.post(
                `http://192.168.192.7:5000/ProductionSCW/${row.uuid}`,
                row
            )
            const data = await response.data

            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const saveScw = createAsyncThunk(
    'pdApp/scw/saveScw',
    async (row, { dispatch, getState, rejectWithValue }) => {
        try {
            const response = await axios.post(
                `http://192.168.192.7:5000/ProductionSCW`,
                row
            )
            const data = await response.data

            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const removeScw = createAsyncThunk(
    'pdApp/scw/removeScw',
    async (uuid, { dispatch, getState }) => {
        const response = await axios.delete(
            `http://192.168.192.7:5000/ProductionSCW/${uuid}`
        )

        await response.data

        return uuid
    }
)

const scwProductionSlice = createSlice({
    name: 'pdApp/scw',
    initialState: {
        pending: false,
    },
    reducers: {},
    extraReducers: {
        [getScw.fulfilled]: (state, action) => action.payload,
        [saveScw.pending]: (state, action) => {
            state.pending = true
        },
        [saveScw.fulfilled]: (state, action) => action.payload,
        [updateScw.pending]: (state, action) => {
            state.pending = true
        },
        [updateScw.fulfilled]: (state, action) => action.payload,
        [removeScw.fulfilled]: (state, action) => null,
    },
})

export const scwActionPending = ({ pdApp }) => pdApp.scw.pending

export default scwProductionSlice.reducer
