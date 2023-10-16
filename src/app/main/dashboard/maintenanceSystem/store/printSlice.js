import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'

const printAdapter = createEntityAdapter({
    selectId: (data) => data.id,
})

export const { selectAll: selectPrint, selectById: selectPrintId } =
    printAdapter.getSelectors((state) => state.dashboard.Print)

const printSlice = createSlice({
    name: 'dashboard/Print',
    initialState: printAdapter.getInitialState({}),
    reducers: {
        printAddOne: printAdapter.upsertOne,
    },
    extraReducers: {},
})

export const { printAddOne } = printSlice.actions

export default printSlice.reducer
