import { combineReducers } from '@reduxjs/toolkit'
import address from './addressSlice'
import machines from './machinesSlice'
import categories from './categoriesSlice'

const reducer = combineReducers({
    address,
    machines,
    categories,
})

export default reducer
