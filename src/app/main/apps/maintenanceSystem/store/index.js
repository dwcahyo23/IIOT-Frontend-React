import { combineReducers } from '@reduxjs/toolkit'
import sparepart from './sparepartSlice'
import machines from './machineParent/machinesSlice'
import com from './machineParent/machinesComSlice'
import process from './machineParent/machinesProcessSlice'
import machineChildren from './machineChildren/machineChildrenSlice'

const reducer = combineReducers({
    sparepart,
    machines,
    com,
    process,
    machineChildren,
})

export default reducer
