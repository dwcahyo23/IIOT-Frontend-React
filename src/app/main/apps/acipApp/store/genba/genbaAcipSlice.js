import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import _, { remove } from 'lodash'

export const getGenbaAcip = createAsyncThunk(
    'genbaAcip/genba/getGenbaAcip',
    async (uuid) => {
        const response = await axios.get(
            `http://localhost:5000/genbaAcipOne/${uuid}`
        )

        const data = await response.data

        return data
    }
)

export const saveGenbaAcip = createAsyncThunk(
    'genbaAcip/genba/saveGenbaAcip',
    async (row, { dispatch, getState }) => {
        // console.log(row)
        try {
            const response = await axios.post(
                `http://localhost:5000/genbaAcip/`,
                row
            )
            const data = await response.data
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const removeGenbaAcip = createAsyncThunk(
    'genbaAcip/genba/removeGenbaAcip',
    async (uuid, { dispatch, getState }) => {
        const response = await axios.delete(
            `http://localhost:5000/genbaAcipDel/${uuid}`
        )

        await response.data

        return uuid
    }
)

const genbaAcipSlice = createSlice({
    name: 'genbaAcip/genba',
    initialState: null,
    reducers: {},
    extraReducers: {
        [getGenbaAcip.fulfilled]: (state, action) => action.payload,
        [saveGenbaAcip.fulfilled]: (state, action) => action.payload,
        [removeGenbaAcip.fulfilled]: (state, action) => null,
    },
})

export const selectGenba = ({ genbaAcip }) => genbaAcip.genba

export default genbaAcipSlice.reducer
