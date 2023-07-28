import { combineReducers } from '@reduxjs/toolkit'
import APPG from './apSlice'
import APUser from './userSlice'
import MNReq from './mnReqSlice'
import MNRep from './mnRepSlice'
import MnOne from './mnOneSlice'

const reducer = combineReducers({
    APPG,
    APUser,
    MNReq,
    MNRep,
    MnOne,
})

export default reducer
