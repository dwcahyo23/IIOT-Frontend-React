import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'
import _ from 'lodash'

export const gete3viewMasterMachineSlices = createAsyncThunk(
    'e3view/machines/getMachines',
    async () => {
        return await axios({
            method: 'post',
            url: 'http://192.168.192.34:8080/api/master/machineInfo',
            headers: { language: 'EN' },
        })
            .then((x) => {
                return x.data.list
            })
            .catch((err) => console.log(err))
    }
)

const Adapter = createEntityAdapter({
    selectId: (data) => data.mchId,
})

export const {
    selectAll: selecte3viewMachines,
    selectById: selecte3viewMachinesById,
} = Adapter.getSelectors((state) => state.e3view.machines)

const e3viewMasterMachineSlices = createSlice({
    name: 'e3view/machines',
    initialState: Adapter.getInitialState({
        pending: false,
    }),
    reducers: {},
    extraReducers: {
        [gete3viewMasterMachineSlices.pending]: (state, action) => {
            state.pending = true
        },
        [gete3viewMasterMachineSlices.fulfilled]: (state, action) => {
            state.pending = false
            Adapter.setAll(state, action.payload)
        },
    },
})

export const isPendingE3ViewMachines = ({ e3view }) => e3view.machines.pending

export default e3viewMasterMachineSlices.reducer
