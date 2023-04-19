import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { showMessage } from 'app/store/fuse/messageSlice'
import axios from 'axios'

export const getCourse = createAsyncThunk(
    'maintenanceApp/course/getCourse',
    async (uuid) => {
        const response = await axios.get(
            `http://192.168.192.7:5000/finItemBy/${uuid}`
        )

        const data = await response.data

        return data
    }
)

export const updateCourse = createAsyncThunk(
    'maintenanceApp/course/updateCourse',
    async (_data, { getState, dispatch }) => {
        const { uuid } = getState().maintenanceApp.course

        console.log(uuid)

        // const response = await axios.put()

        // const data = await response.data;

        // dispatch(showMessage({message: 'Updated!'}))

        // return data;
    }
)

const courseSlice = createSlice({
    name: 'maintenanceApp/course',
    initialState: null,
    reducers: {},
    extraReducers: {
        [getCourse.fulfilled]: (state, action) => action.payload,
    },
})

export const selectCourse = ({ maintenanceApp }) => maintenanceApp.course

export default courseSlice.reducer
