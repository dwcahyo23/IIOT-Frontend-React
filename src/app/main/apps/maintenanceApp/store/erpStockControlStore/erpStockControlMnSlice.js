import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getErpStockControl = createAsyncThunk(
    'mnApp/erpstockcontrol/getErpStockControl',
    async (uuid) => {
        const response = await axios.get(
            `http://192.168.192.7:5000/mnstockcontrolid/${uuid}`
        )

        const data = await response.data

        return data
    }
)

export const saveErpStockControl = createAsyncThunk(
    'mnApp/erpstockcontrol/saveErpStockControl',
    async (row, { dispatch, getState }) => {
        try {
            const response = await axios.patch(
                `http://192.168.192.7:5000/mnstockcontrolid/${row.uuid}`,
                row
            )
            const data = await response.data

            return data
        } catch (error) {
            console.log(error)
        }
    }
)

const erpStockControlMnSlice = createSlice({
    name: 'mnApp/erpstockcontrol',
    initialState: {
        pending: false,
    },
    reducers: {},
    extraReducers: {
        [getErpStockControl.fulfilled]: (state, action) => action.payload,
        [saveErpStockControl.fulfilled]: (state, action) => action.payload,
    },
})

export const selectErpControlStock = ({ mnApp }) => mnApp.erpstockcontrol

export default erpStockControlMnSlice.reducer
