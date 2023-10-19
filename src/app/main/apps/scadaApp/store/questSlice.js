import {
    createAsyncThunk,
    createSlice,
    createEntityAdapter,
    isRejectedWithValue,
} from '@reduxjs/toolkit'
import axios from 'axios'
import _ from 'lodash'

export const getQuest = createAsyncThunk(
    'ScadaApp/Quest/getQuest',
    async (params) => {
        const response = await axios
            .get('http://192.168.192.7:9000/exec', {
                params: {
                    query: 'SELECT * FROM zbSens;',
                },
            })
            .then((res) => {
                return res.data
            })

        // const data = params.query

        // return data === undefined ? null : data
    }
)

const questSlice = createSlice({
    name: 'ScadaApp/Quest',
    initialState: null,
    reducers: {},
    extraReducers: {
        [getQuest.fulfilled]: (state, action) => action.payload,
    },
})

export const { newScada, resetScada } = questSlice.actions

export const selectScada = ({ ScadaApp }) => ScadaApp.Quest

export default questSlice.reducer
