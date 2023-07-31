import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import _ from 'lodash'

export const getMnControllStock = createAsyncThunk(
    'dashboard/MnControllStock/getMnControllStock',
    async () => {
        const response = await axios.get(
            `http://192.168.192.7:5000/maintenanceControlStock`
        )

        const data = await response.data

        return data === undefined ? null : data
    }
)

export const saveMnControllStock = createAsyncThunk(
    'dashboard/MnControllStock/maintenanceControlStockB',
    async (row, { dispatch, getState }) => {
        try {
            const response = await axios.post(
                `http://192.168.192.7:5000/maintenanceControlStock`,
                row
            )
            const data = await response.data
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

const mnControllStock = createSlice({
    name: 'dashboard/MnControllStock',
    initialState: null,
    reducers: {
        resetMnControllStock: () => null,
        newMnControllStock: {
            reducer: (state, action) => action.payload,
            prepare: (event) => ({
                payload: {
                    uuid: '',
                },
            }),
        },
    },
    extraReducers: {
        [getMnControllStock.fulfilled]: (state, action) => action.payload,
        [saveMnControllStock.fulfilled]: (state, action) => action.payload,
    },
})

export const { newMnControllStock, resetMnControllStock } =
    mnControllStock.actions

export const selectMnControllStock = ({ dashboard }) =>
    dashboard.MnControllStock

export default mnControllStock.reducer
