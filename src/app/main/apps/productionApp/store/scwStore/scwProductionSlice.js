import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { create } from 'lodash'

export const getScw = createAsyncThunk('pdApp/scw/getScw', async (uuid) => {
    const response = await axios.get(
        `http://localhost:5000/ProductionSCW/${uuid}`
    )

    const data = await response.data

    return data
})

export const saveScw = createAsyncThunk(
    'pdApp/scw/saveScw',
    async (row, { dispatch, getState }) => {
        try {
            const response = await axios.patch(
                `http://localhost:5000/ProductionSCW/${row.uuid}`,
                row
            )
            const data = await response.data

            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const removeScw = createAsyncThunk(
    'pdApp/scw/removeScw',
    async (uuid, { dispatch, getState }) => {
        const response = await axios.delete(
            `http://localhost:5000/ProductionSCW/${uuid}`
        )

        await response.data

        return uuid
    }
)

const scwProductionSlice = createSlice({
    name: 'pdApp/scw',
    initialState: null,
    reducers: {},
    extraReducers: {
        [getScw.fulfilled]: (state, action) => action.payload,
        [saveScw.fulfilled]: (state, action) => action.payload,
        [removeScw.fulfilled]: (state, action) => null,
    },
})

// export const selectScw = ({ pdApp }) => pdApp.Scw
