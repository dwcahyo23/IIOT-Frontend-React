import {
    configureStore,
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const initZbSlice = createAsyncThunk(
    'ScadaApp/Scada/initZb',
    async (params) => {
        const response = await axios.get(`http://192.168.192.7:5000/ZbOn`)
        const data = await response.data
        return data
    }
)

export const upZbSlice = createAsyncThunk(
    'ScadaApp/Scada/upZb',
    async (row, { dispatch, getState, rejectWithValue }) => {
        try {
            const response = await axios.post(
                `http://192.168.192.7:5000/ZbConn`,
                row
            )
            const data = await response.data
            return data
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

const scadaAdapter = createEntityAdapter({
    selectId: (data) => data.id,
    sortComparer: (a, b) => a.mch_code.localeCompare(b.mch_code),
})

export const { selectAll: selectScada, selectById: selectScadaById } =
    scadaAdapter.getSelectors((state) => state.ScadaApp.Scada)

const machinesSlice = createSlice({
    name: 'ScadaApp/Scada',
    initialState: scadaAdapter.getInitialState({
        loading: 'idle',
    }),
    reducers: {
        zbAdded: scadaAdapter.addOne,
        zbUpdate: scadaAdapter.updateOne,
        zbUpsert: scadaAdapter.upsertOne,
        zbUpsertMany: scadaAdapter.upsertMany,
    },
    extraReducers: {
        [initZbSlice.fulfilled]: scadaAdapter.setAll,
        [upZbSlice.fulfilled]: (state, action) => {
            action.payload
        },
    },
})

export const { zbAdded, zbUpdate, zbUpsert, zbUpsertMany } =
    machinesSlice.actions

export default machinesSlice.reducer
