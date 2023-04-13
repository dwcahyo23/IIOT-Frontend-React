import { combineReducers } from '@reduxjs/toolkit'
import machines from './machinesSlice'
import categories from './categoriesSlice'

const reducer = combineReducers({
    categories,
    machines,
})

export default reducer
