import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import _ from 'lodash'

export const getSparepart = createAsyncThunk(
    'maintenanceSystem/sparepart/getSparepart',
    async (sparepartId) => {
        const response = await axios.get(
            `http://192.168.192.7:5000/findItemBy/${addressId}`
        )

        const data = await response.data

        return data === undefined ? null : data
    }
)

export const saveSparepart = createAsyncThunk(
    'maintenanceSystem/sparepart/saveSaparepart',
    async (sparepartData, { dipatch, getState }) => {
        const response = await axios.post(
            `http://192.168.192.7:5000/insItem`,
            sparepartData
        )
        const data = await response.data
        return data
    }
)

const sparepartSlice = createSlice({
    name: 'maintenanceSystem/sparepart',
    initialState: null,
    reducers: {
        resetSparepart: () => null,
        newSparepart: {
            reducer: (state, action) => action.payload,
            prepare: (event) => ({
                payload: {},
            }),
        },
    },
    extraReducers: {
        [getSparepart.fulfilled]: (state, action) => action.payload,
        [saveSparepart.fulfilled]: (state, action) => action.payload,
    },
})

export const { newSparepart, resetSparepart } = sparepartSlice.actions

export const selectSparepart = ({ maintenanceSystem }) =>
    maintenanceSystem.sparepart

export default sparepartSlice.reducer
