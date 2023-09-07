import {
    createAsyncThunk,
    createSlice,
    isRejectedWithValue,
} from '@reduxjs/toolkit'
import axios from 'axios'
import _ from 'lodash'

export const getMnOne = createAsyncThunk(
    'dashboard/MnOne/getMnOne',
    async (params) => {
        const response = await axios.get(
            `http://localhost:5000/machineSheet/${params.uuid}/${params.sheet_no}/${params.uuid_request}`
        )

        const data = await response.data

        return data === undefined ? null : data
    }
)

export const saveMnOne = createAsyncThunk(
    'dashboard/MnOne/saveMnOne',
    async (row, { dispatch, getState, rejectWithValue }) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/maintenanceReport`,
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

export const saveMnOneRequest = createAsyncThunk(
    'dashboard/MnOne/saveMnOneRequest',
    async (params, { dispatch, getState, rejectWithValue }) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/maintenanceRequest/${params.options}/${params.user}`,
                params.row
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

const mnOneSlice = createSlice({
    name: 'dashboard/MnOne',
    initialState: null,
    reducers: {
        resetMnOne: () => null,
        newMnOne: {
            reducer: (state, action) => action.payload,
            prepare: (event) => ({
                payload: {},
            }),
        },
    },
    extraReducers: {
        [getMnOne.fulfilled]: (state, action) => action.payload,
        [saveMnOne.fulfilled]: (state, action) => action.payload,
        [saveMnOneRequest.fulfilled]: (state, action) => action.payload,
    },
})

export const { newMnOne, resetMnOne } = mnOneSlice.actions

export const selectMnOne = ({ dashboard }) => dashboard.MnOne

export default mnOneSlice.reducer
