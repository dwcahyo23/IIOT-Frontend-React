import { combineReducers } from '@reduxjs/toolkit'
import APPG from './apSlice'
import APUser from './userSlice'
import MNReq from './mnReqSlice'

const reducer = combineReducers({
    APPG,
    APUser,
    MNReq,
})

export default reducer
