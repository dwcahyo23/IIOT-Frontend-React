import {
    configureStore,
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getApSlice = createAsyncThunk(
    'dashboard/APPG/getApSlice',
    async (params) => {
        //!for not in entity adapter:
        const response = await axios.get(
            `http://192.168.192.7:5000/maintenanceDashboard/${params.com}/${params.section}`
        )
        //!end

        // const response = await axios.get(`http://192.168.192.7:5000/pgMaintenance`)
        const data = await response.data
        return data
    }
)

export const getMachineSlice = createAsyncThunk(
    'dashboard/APPG/getMachineSlice',
    async () => {
        const response = await axios.get(
            'http://192.168.192.7:5000/maintenanceMachine'
        )
        const data = await response.data
        return data
    }
)

// const apAdapter = createEntityAdapter({
//     selectId: (data) => data.id,
//     sortComparer: (a, b) => a.displayName.localeCompare(b.displayName),
// })

// export const { selectAll: selectAp, selectById: selectApById } =
//     apAdapter.getSelectors((state) => state.dashboard.APPG)

const apSlice = createSlice({
    name: 'dashboard/APPG',
    // initialState: apAdapter.getInitialState({
    //     loading: 'idle',
    // }),
    initialState: null,
    reducers: {
        // apAdded: apAdapter.addOne,
        // apUpdated: apAdapter.updateOne,
        // apUpsert: apAdapter.upsertOne,
        // apUpsertMany: apAdapter.upsertMany,
    },
    extraReducers: {
        // [getApSlice.fulfilled]: apAdapter.setAll,
        // [getMachineSlice.fulfilled]: (state, action) => {},

        //!for not in entity adapter:
        [getApSlice.fulfilled]: (state, action) => action.payload,
        //!end
    },
})

// export const { apAdded, apUpdated, apUpsert, apUpsertMany } = apSlice.actions

//!for not in entity adapter:
export const selectAp = ({ dashboard }) => dashboard.APPG
//!end

export default apSlice.reducer
