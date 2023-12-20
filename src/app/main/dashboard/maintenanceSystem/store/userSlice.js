import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getUserSlice = createAsyncThunk(
    'dashboard/APUser/getUserSlice',
    async () => {
        const response = await axios.get('http://192.168.192.7:5000/userData')
        const data = await response.data
        return data
    }
)

const userAdapter = createEntityAdapter({
    selectId: (data) => data.id,
})

export const {
    selectAll: selectApUser,
    selectById: selectApUserById,
    selectEntities: selectApEntity,
} = userAdapter.getSelectors((state) => state.dashboard.APUser)

const userSlice = createSlice({
    name: 'dashboard/APUser',
    initialState: userAdapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getUserSlice.fulfilled]: userAdapter.setAll,
    },
})

export default userSlice.reducer
