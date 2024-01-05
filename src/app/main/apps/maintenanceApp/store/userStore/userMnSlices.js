import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const getUsersMn = createAsyncThunk(
    'mnApp/user/getUsersMn',
    async () => {
        const response = await axios.get('http://localhost:5000/userData')
        const data = await response.data
        return data
    }
)

const userAdapter = createEntityAdapter({
    selectId: (data) => data.id,
})

export const { selectAll: selectMnUsers, selectById: selectMnUsersById } =
    userAdapter.getSelectors((state) => state.mnApp.user)

const userMnSlices = createSlice({
    name: 'mnApp/user',
    initialState: userAdapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [getUsersMn.fulfilled]: userAdapter.setAll,
    },
})

export default userMnSlices.reducer