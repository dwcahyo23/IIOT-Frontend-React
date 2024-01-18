import { combineReducers } from '@reduxjs/toolkit'
import scw from './scwStore/scwProductionSlice'
import scws from './scwStore/scwProductionSlices'

const reducer = combineReducers({
    scw,
    scws,
})

export default reducer
