import { combineReducers } from '@reduxjs/toolkit'
import machines from './machinesSlice'
import categories from './categoriesSlice'
import course from './courseSlice'
import item from './itemSlice'
import machineCode from './machineCodeSlice'

const reducer = combineReducers({
    categories,
    machines,
    course,
    item,
    machineCode,
})

export default reducer
