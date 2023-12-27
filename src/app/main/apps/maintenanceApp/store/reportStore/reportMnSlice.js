import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getReport = createAsyncThunk(
    'mnApp/report/getReport',
    async (uuid) => {
        const response = await axios.get(
            `http://localhost:5000/mnreportid/${uuid}`
        )

        const data = await response.data

        return data
    }
)

export const saveReport = createAsyncThunk(
    'mnApp/report/saveReport',
    async (row, { dispatch, getState }) => {
        try {
            const response = await axios.patch(
                `http://localhost:5000/mnreportid/${row.sheet_no}`,
                row
            )
            const data = await response.data

            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const removeReport = createAsyncThunk(
    'mnApp/report/removeReport',
    async (uuid, { dispatch, getState }) => {
        const response = await axios.delete(
            `http://localhost:5000/mnreportid/${uuid}`
        )

        await response.data

        return uuid
    }
)

const reportMnSlice = createSlice({
    name: 'mnApp/report',
    initialState: null,
    reducers: {},
    extraReducers: {
        [getReport.fulfilled]: (state, action) => action.payload,
        [saveReport.fulfilled]: (state, action) => action.payload,
        [removeReport.fulfilled]: (state, action) => null,
    },
})

export const selectReport = ({ mnApp }) => mnApp.report

export default reportMnSlice.reducer
