import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getItem = createAsyncThunk(
    'maintenanceApp/item/getItem',
    async (itemId) => {
        const response = await axios.get(
            `http://192.168.192.7:5000/machineitem/${itemId}`
        )
        const data = await response.data

        return data === undefined ? null : data
    }
)

export const removeItem = createAsyncThunk(
    'maintenanceApp/item/removeItem',
    async (val, { dispatch, getState }) => {
        const { uuid } = getState().maintenanceApp.item
        await axios.delete(`http://192.168.192.7:5000/machineitem/${uuid}`)

        return uuid
    }
)

export const saveItem = createAsyncThunk(
    'maintenanceApp/item/saveItem',
    async (itemData, { dispatch, getState }) => {
        console.log(itemData)
        const { uuid } = getState().maintenanceApp
        const response = await axios.post(
            `http://192.168.192.7:5000/insItem`,
            itemData
        )
        const data = await response.data

        return data
    }
)

const itemSlice = createSlice({
    name: 'maintenanceApp/item',
    initialState: null,
    reducers: {
        resetItem: () => null,
        newItem: {
            reducer: (state, action) => action.payload,
            prepare: (event) => ({
                payload: {
                    mch_code: '',
                    bom: '',
                    category: '',
                    item_name: '',
                    item_life_time: '',
                    item_lead_time: '',
                    change_at: '',
                    item_status: '',
                    item_category: '',
                },
            }),
        },
    },
    extraReducers: {
        [getItem.fulfilled]: (state, action) => action.payload,
        [saveItem.fulfilled]: (state, action) => action.payload,
        [removeItem.fulfilled]: (state, action) => null,
    },
})

export const { newItem, resetItem } = itemSlice.actions

export const selectItem = ({ maintenanceApp }) => maintenanceApp.item

export default itemSlice.reducer
