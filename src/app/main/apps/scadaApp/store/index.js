import { combineReducers } from '@reduxjs/toolkit'
import Scada from './machinesSlice'
import Quest from './questSlice'

const reducer = combineReducers({
    Scada,
    Quest,
})

export default reducer
