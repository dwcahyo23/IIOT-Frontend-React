import { combineReducers } from '@reduxjs/toolkit'
import machines from './machinesSlice'
import categories from './categoriesSlice'
import course from './courseSlice'
import item from './itemSlice'
import machineCode from './machineCodeSlice'
import worder from './worderSlice'

const reducer = combineReducers({
    categories,
    machines,
    course,
    item,
    machineCode,
    worder,
})

export default reducer
