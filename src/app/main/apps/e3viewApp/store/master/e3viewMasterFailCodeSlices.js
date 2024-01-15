import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'
import _ from 'lodash'

export const gete3viewMasterFailCode = createAsyncThunk(
    'e3view/failCode/getFailCode',
    async () => {
        return await axios({
            method: 'post',
            url: 'http://192.168.192.34:8080/api/master/failCode',
            headers: { language: 'EN' },
        })
            .then((x) => {
                return x.data.list
            })
            .catch((err) => console.log(err))
    }
)

const Adapter = createEntityAdapter({
    selectId: (data) => data.failCode,
})

export const {
    selectAll: selecte3viewFailCode,
    selectById: selecte3viewFailCodeById,
} = Adapter.getSelectors((state) => state.e3view.failCode)

const e3viewMasterMachineSlices = createSlice({
    name: 'e3view/failCode',
    initialState: Adapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [gete3viewMasterFailCode.fulfilled]: Adapter.setAll,
    },
})

export default e3viewMasterMachineSlices.reducer
