import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getRequest = createAsyncThunk(
    'mnApp/request/getRequest',
    async (uuid) => {
        const response = await axios.get(
            `http://192.168.192.7:5000/mnrequestid/${uuid}`
        )

        const data = await response.data

        return data
    }
)

export const saveRequest = createAsyncThunk(
    'mnApp/request/saveRequest',
    async (row, { dispatch, getState }) => {
        try {
            const response = await axios.patch(
                `http://192.168.192.7:5000/mnrequestid/${row.sheet_no}`,
                row
            )
            const data = await response.data

            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const removeRequest = createAsyncThunk(
    'mnApp/request/removeRequest',
    async (uuid, { dispatch, getState }) => {
        const response = await axios.delete(
            `http://192.168.192.7:5000/mnrequestid/${uuid}`
        )

        await response.data

        return uuid
    }
)

const requestMnSlice = createSlice({
    name: 'mnApp/request',
    initialState: {
        pending: false,
    },
    reducers: {},
    extraReducers: {
        [saveRequest.pending]: (state, action) => {
            state.pending = true
        },
        [saveRequest.fulfilled]: (state, action) => {
            state.pending = false
            action.payload
        },
        [getRequest.fulfilled]: (state, action) => action.payload,
        [removeRequest.fulfilled]: (state, action) => null,
    },
})

export const selectRequest = ({ mnApp }) => mnApp.request

export const saveRequestPending = ({ mnApp }) => mnApp.request.pending

export default requestMnSlice.reducer
