import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getStok = createAsyncThunk('mnApp/stok/getStok', async (uuid) => {
    const response = await axios.get(
        `http://192.168.192.7:5000/mnstockid/${uuid}`
    )

    const data = await response.data

    return data
})

export const saveStok = createAsyncThunk(
    'mnApp/stok/saveStok',
    async (row, { dispatch, getState }) => {
        try {
            const response = await axios.patch(
                `http://192.168.192.7:5000/mnstockid/${row.sheet_no}`,
                row
            )
            const data = await response.data

            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const removeStok = createAsyncThunk(
    'mnApp/stok/removeStok',
    async (uuid, { dispatch, getState }) => {
        const response = await axios.delete(
            `http://192.168.192.7:5000/mnstockid/${uuid}`
        )

        await response.data

        return uuid
    }
)

const stokMnSlice = createSlice({
    name: 'mnApp/stok',
    initialState: null,
    reducers: {},
    extraReducers: {
        [getStok.fulfilled]: (state, action) => action.payload,
        [saveStok.fulfilled]: (state, action) => action.payload,
        [removeStok.fulfilled]: (state, action) => null,
    },
})

export const selectStok = ({ mnApp }) => mnApp.stok

export default stokMnSlice.reducer
