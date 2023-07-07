import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import _ from 'lodash'

export const getMaintenanceSystem = createAsyncThunk(
    'maintenanceSystem/machineChildren/getMaintenanceSystem',
    async (uuid) => {
        const response = await axios.get(
            `http://192.168.129.7:5000/maintenanceMachine/${uuid}`
        )

        const data = await response.data

        return data === undefined ? null : data
    }
)

export const saveMaintenanceSystem = createAsyncThunk(
    'maintenanceSystem/machineChildren/saveMaintenanceSystem',
    async (row, { dispatch, getState }) => {
        try {
            const response = await axios.post(
                `http://192.168.129.7:5000/maintenanceReport`,
                row
            )
            const data = await response.data
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const saveMaintenanceSystemRequest = createAsyncThunk(
    'maintenanceSystem/machineChildren/saveMaintenanceSystemRequest',
    async (row, { dispatch, getState }) => {
        try {
            const response = await axios.post(
                `http://192.168.129.7:5000/maintenanceRequest`,
                row
            )
            const data = await response.data
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

const machineChildrenSlice = createSlice({
    name: 'maintenanceSystem/machineChildren',
    initialState: null,
    reducers: {
        resetMachineChildren: () => null,
        newMachineChildren: {
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
        [getMaintenanceSystem.fulfilled]: (state, action) => action.payload,
        [saveMaintenanceSystem.fulfilled]: (state, action) => action.payload,
        [saveMaintenanceSystemRequest.fulfilled]: (state, action) =>
            action.payload,
    },
})

export const { newMachineChildren, resetMachineChildren } =
    machineChildrenSlice.actions

export const selectMachineChildren = ({ maintenanceSystem }) =>
    maintenanceSystem.machineChildren

export default machineChildrenSlice.reducer
