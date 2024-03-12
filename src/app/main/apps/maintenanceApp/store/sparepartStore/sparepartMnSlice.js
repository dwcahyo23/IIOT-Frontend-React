import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getSparepart = createAsyncThunk(
    'mnApp/sparepart/getSparepart',
    async (uuid) => {
        const response = await axios.get(
            `http://localhost:5000/mnsparepartid/${uuid}`
        )

        const data = await response.data

        return data
    }
)

export const saveSparepart = createAsyncThunk(
    'mnApp/sparepart/saveSparepart',
    async (row, { dispatch, getState }) => {
        try {
            const response = await axios.patch(
                `http://localhost:5000/mnsparepartid/${row.sheet_no}`,
                row
            )
            const data = await response.data

            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const removeSparepart = createAsyncThunk(
    'mnApp/sparepart/removeSparepart',
    async (uuid, { dispatch, getState }) => {
        const response = await axios.delete(
            `http://localhost:5000/mnsparepartid/${uuid}`
        )

        await response.data

        return uuid
    }
)

const sparepartMnSlice = createSlice({
    name: 'mnApp/sparepart',
    initialState: null,
    reducers: {},
    extraReducers: {
        [getSparepart.fulfilled]: (state, action) => action.payload,
        [saveSparepart.fulfilled]: (state, action) => action.payload,
        [removeSparepart.fulfilled]: (state, action) => null,
    },
})

export const selectSparepart = ({ mnApp }) => mnApp.sparepart

export default sparepartMnSlice.reducer
