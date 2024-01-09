import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getReport = createAsyncThunk(
    'mnApp/report/getReport',
    async (uuid) => {
        const response = await axios.get(
            `http://192.168.192.7:5000/mnreportid/${uuid}`
        )

        const data = await response.data

        return data
    }
)

export const saveReport = createAsyncThunk(
    'mnApp/report/saveReport',
    async (row, { dispatch, getState, rejectWithValue }) => {
        try {
            const response = await axios.patch(
                `http://192.168.192.7:5000/mnreportid/${row.sheet_no}`,
                row
            )
            const data = await response.data

            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const removeReport = createAsyncThunk(
    'mnApp/report/removeReport',
    async (uuid, { dispatch, getState, rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `http://192.168.192.7:5000/mnreportid/${uuid}`
            )

            await response.data

            return uuid
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const reportMnSlice = createSlice({
    name: 'mnApp/report',
    initialState: {
        pending: false,
    },
    reducers: {},
    extraReducers: {
        [saveReport.pending]: (state, action) => {
            state.pending = true
        },
        [saveReport.fulfilled]: (state, action) => {
            state.pending = false
            action.payload
        },
        [getReport.fulfilled]: (state, action) => action.payload,
        [removeReport.fulfilled]: (state, action) => null,
    },
})

export const selectReport = ({ mnApp }) => mnApp.report

export const saveReportPending = ({ mnApp }) => mnApp.report.pending

export default reportMnSlice.reducer
