import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'
import _ from 'lodash'

export const gete3viewEquipmentInfo = createAsyncThunk(
    'e3view/statusEquipmentInfo/getEquipmentInfo',
    async () => {
        return await axios({
            method: 'post',
            url: 'http://192.168.192.34/api/statusBoard/equipmentInfo',
            data: {},
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
    selectAll: selecte3viewEquipmentInfo,
    selectById: selecte3viewEquipmentInfoById,
} = Adapter.getSelectors((state) => state.e3view.statusEquipmentInfo)

const e3viewEquipmentInfoSlices = createSlice({
    name: 'e3view/statusEquipmentInfo',
    initialState: Adapter.getInitialState({}),
    reducers: {},
    extraReducers: {
        [gete3viewEquipmentInfo.fulfilled]: Adapter.setAll,
    },
})

export default e3viewEquipmentInfoSlices.reducer
