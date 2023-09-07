import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getApSlice = createAsyncThunk(
    'dashboard/APPG/getApSlice',
    async (params) => {
        const response = await axios.get(
            `http://localhost:5000/maintenanceDashboard/${params.com}/${params.section}`
        )
        const data = await response.data
        return data
    }
)

// const apAdapter = createEntityAdapter({
//     selectId: (data) => data.sheet_no,
// })

// export const { selectAll: selectAp, selectById: selectApById } =
//     apAdapter.getSelectors((state) => state.dashboard.APPG)

const apSlice = createSlice({
    name: 'dashboard/APPG',
    initialState: null,
    reducers: {},
    extraReducers: {
        // [getApSlice.fulfilled]: apAdapter.setAll,
        [getApSlice.fulfilled]: (state, action) => action.payload,
    },
})

export const selectAp = ({ dashboard }) => dashboard.APPG

export default apSlice.reducer
