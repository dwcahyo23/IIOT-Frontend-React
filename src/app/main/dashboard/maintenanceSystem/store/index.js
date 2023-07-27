import { combineReducers } from '@reduxjs/toolkit'
import APPG from './apSlice'
import APUser from './userSlice'
import MNReq from './mnReqSlice'
import MnOne from './mnOneSlice'

const reducer = combineReducers({
    APPG,
    APUser,
    MNReq,
    MnOne,
})

export default reducer
