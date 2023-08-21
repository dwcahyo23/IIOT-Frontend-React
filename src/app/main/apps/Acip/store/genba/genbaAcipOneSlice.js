import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import _ from 'lodash'

export const getAcipOne = createAsyncThunk(
    'genbaAcip/genbaOne/getAcipOne',
    async (uuid) => {
        const response = await axios.get(
            `http://192.168.192.7:5000/genbaAcipOne/${uuid}`
        )

        const data = await response.data

        return data === undefined ? null : data
    }
)

export const saveAcipOne = createAsyncThunk(
    'genbaAcip/genbaOne/saveAcipOne',
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

const genbaAcipOneSlice = createSlice({
    name: 'genbaAcip/genbaOne',
    initialState: null,
    reducers: {
        resetAcipOne: () => null,
        newAcipOne: {
            reducer: (state, action) => action.payload,
            prepare: (event) => ({
                payload: {
                    id: '',
                },
            }),
        },
    },
    extraReducers: {
        [getAcipOne.fulfilled]: (state, action) => action.payload,
        [saveAcipOne.fulfilled]: (state, action) => action.payload,
    },
})

export const { newAcipOne, resetAcipOne } = genbaAcipOneSlice.actions

export const selectMnOne = ({ genbaAcip }) => genbaAcip.MnOne

export default genbaAcipOneSlice.reducer
