import {
    createAsyncThunk,
    createSlice,
    createEntityAdapter,
    isRejectedWithValue,
} from '@reduxjs/toolkit'
import axios from 'axios'
import _ from 'lodash'

export const getQuest = createAsyncThunk(
    'ScadaApp/Quest/getQuest',

    async (row, { dispatch, getState, rejectWithValue }) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/query`,
                row
            )
            const data = await response.data
            return data
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

const questSlice = createSlice({
    name: 'ScadaApp/Quest',
    initialState: null,
    reducers: {},
    extraReducers: {
        [getQuest.fulfilled]: (state, action) => action.payload,
    },
})

export const { newScada, resetScada } = questSlice.actions

export const selectScada = ({ ScadaApp }) => ScadaApp.Quest

export default questSlice.reducer
