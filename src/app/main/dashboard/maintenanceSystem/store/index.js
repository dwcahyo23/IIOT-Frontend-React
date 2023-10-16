import { combineReducers } from '@reduxjs/toolkit'
import APPG from './apSlice'
import APUser from './userSlice'
import MNReq from './mnReqSlice'
import MNRep from './mnRepSlice'
import MnOne from './mnOneSlice'
import MnControllStock from './mnControllStockSlice'
import MNMachine from './mnMachineSlice'
import Print from './printSlice'

const reducer = combineReducers({
    APPG,
    APUser,
    MNReq,
    MNRep,
    MnOne,
    MnControllStock,
    MNMachine,
    Print,
})

export default reducer
