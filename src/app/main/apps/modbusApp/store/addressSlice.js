import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import _ from 'lodash'
import { object } from 'prop-types'

export const getAddress = createAsyncThunk(
    'maintenanceApp/item/getAddress',
    async (addressId) => {
        const response = await axios.get(
            `http://192.168.192.7:5000/getResultBy/${addressId}`
        )
        const data = await response.data
        _.map(data, (val, key) => {
            if (
                key == 'data_register' &&
                typeof data.data_register == 'object'
            ) {
                data['data_register'] = JSON.stringify(val)
            }
        })

        return data === undefined ? null : data
    }
)

export const saveAddress = createAsyncThunk(
    'modbusApp/address/saveAddress',
    async (addressData, { dispatch, getState }) => {
        _.map(addressData, (val, key) => {
            if (
                key == 'data_register' &&
                typeof addressData.data_register == 'string'
            ) {
                addressData['data_register'] = JSON.parse(val)
            }
        })
        console.log(addressData)

        const response = await axios.post(
            `http://192.168.192.7:5000/insAddress`,
            addressData
        )
        const data = await response.data
        return data
    }
)

const addressSlice = createSlice({
    name: 'modbusApp/address',
    initialState: null,
    reducers: {
        resetAddress: () => null,
        newAddress: {
            reducer: (state, action) => action.payload,
            prepare: (event) => ({
                payload: {
                    mch_code: '',
                    mch_name: '',
                    mch_com: '',
                    ip_address: '',
                    port_address: '',
                    setId_address: '',
                    setTimeout_address: '',
                    address_register: '',
                    quantity_register: '',
                    data_register: '',
                },
            }),
        },
    },
    extraReducers: {
        [getAddress.fulfilled]: (state, action) => action.payload,
        [saveAddress.fulfilled]: (state, action) => {
            action.payload
        },
    },
})

export const { newAddress, resetAddress } = addressSlice.actions

export const selectAddress = ({ modbusApp }) => modbusApp.address

export default addressSlice.reducer
