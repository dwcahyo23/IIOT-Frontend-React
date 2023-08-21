import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import _ from 'lodash'

export const getGenbaAcip = createAsyncThunk(
    'genbaAcip/genba/getGenbaAcip',
    async () => {
        const response = await axios.get(`http://192.168.192.7:5000/genbaAcip`)

        const data = await response.data

        return data
    }
)

// export const getGenbaOne = createAsyncThunk(
//     'genbaAcip/genba/getGenbaAcipOne',
//     async (uuid) => {
//         const response = await axios.get(
//             `http://192.168.192.7:5000/genbaAcipOne/${uuid}`
//         )

//         const data = await response.data

//         return data === undefined ? null : data
//     }
// )

export const saveGenbaAcip = createAsyncThunk(
    'genbaAcip/genba/saveGenbaAcip',
    async (row, { dispatch, getState }) => {
        try {
            const response = await axios.post(
                `http://192.168.192.7:5000/genbaAcip`,
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
    async (val, { dispatch, getState }) => {
        const { uuid } = getState().genbaAcip.item
        // await axios.delete(`http://192.168.192.7:5000/machineitem/${uuid}`)

        // return uuid
    }
)

const genbaAcipSlice = createSlice({
    name: 'genbaAcip/genba',
    initialState: null,
    reducers: {
        resetGenbaAcip: () => null,
        newGenbaAcip: {
            reducer: (state, action) => action.payload,
            prepare: (event) => ({
                payload: {
                    id: '',
                },
            }),
        },
    },
    extraReducers: {
        [getGenbaAcip.fulfilled]: (state, action) => action.payload,
        [saveGenbaAcip.fulfilled]: (state, action) => action.payload,
        [removeGenbaAcip.fulfilled]: (state, action) => null,
    },
})

export const { newGenbaAcip, resetGenbaAcip } = genbaAcipSlice.actions

export const selectGenbaAcip = ({ genbaAcip }) => genbaAcip.genba

export default genbaAcipSlice.reducer
