import { combineReducers } from '@reduxjs/toolkit'

import machines from './machineParent/machinesSlice'
import com from './machineParent/machinesComSlice'
import process from './machineParent/machinesProcessSlice'
import machineChildren from './machineChildren/machineChildrenSlice'
import stock from './machineChildren/machineStock'

const reducer = combineReducers({
    machines,
    com,
    process,
    machineChildren,
    stock,
})

export default reducer
