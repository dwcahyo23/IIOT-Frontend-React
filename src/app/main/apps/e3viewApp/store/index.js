import { combineReducers } from '@reduxjs/toolkit'
import machines from './master/e3viewMasterMachineSlices'
import failCode from './master/e3viewMasterFailCodeSlices'
import statusEquipmentInfo from './statusBoard/e3viewEquipmentInfoSlices'
const reducer = combineReducers({
    machines,
    failCode,
    statusEquipmentInfo,
})

export default reducer
