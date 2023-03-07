import { combineReducers } from '@reduxjs/toolkit'
import modbus from './modbusSlice'
const reducer = combineReducers({
    modbus,
})

export default reducer
