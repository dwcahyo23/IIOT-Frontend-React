import { combineReducers } from '@reduxjs/toolkit'
import APPG from './apSlice'
import APUser from './userSlice'

const reducer = combineReducers({
    APPG,
    APUser,
})

export default reducer
