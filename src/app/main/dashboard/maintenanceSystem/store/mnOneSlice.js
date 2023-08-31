import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import _ from 'lodash'

export const getMnOne = createAsyncThunk(
    'dashboard/MnOne/getMnOne',
    async (uuid) => {
        const response = await axios.get(
            `http://192.168.192.7:5000/maintenanceMachine/${uuid}`
        )

        const data = await response.data

        return data === undefined ? null : data
    }
)

export const saveMnOne = createAsyncThunk(
    'dashboard/MnOne/saveMnOne',
    async (row, { dispatch, getState }) => {
        try {
            const response = await axios.post(
                `http://192.168.192.7:5000/maintenanceReport`,
                row
            )
            const data = await response.data
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const saveMnOneRequest = createAsyncThunk(
    'dashboard/MnOne/saveMnOneRequest',
    async (row, { dispatch, getState }) => {
        try {
            const response = await axios.post(
                `http://192.168.192.7:5000/maintenanceRequest`,
                row
            )
            const data = await response.data
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

const mnOneSlice = createSlice({
    name: 'dashboard/MnOne',
    initialState: null,
    reducers: {
        resetMnOne: () => null,
        newMnOne: {
            reducer: (state, action) => action.payload,
            prepare: (event) => ({
                payload: {
                    uuid: '',
                    mch_code: '',
                    mch_name: '',
                    mch_process: '',
                    mch_process: '',
                    mch_com: '',
                    mch_loc: '',
                    mch_prod: '',
                    mch_maker: '',
                    MaintenanceSpareparts: [],
                    request: {
                        id_request: '',
                    },
                },
            }),
        },
    },
    extraReducers: {
        [getMnOne.fulfilled]: (state, action) => action.payload,
        [saveMnOne.fulfilled]: (state, action) => action.payload,
        [saveMnOneRequest.fulfilled]: (state, action) => action.payload,
    },
})

export const { newMnOne, resetMnOne } = mnOneSlice.actions

export const selectMnOne = ({ dashboard }) => dashboard.MnOne

export default mnOneSlice.reducer
