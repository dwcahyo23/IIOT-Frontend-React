import { combineReducers } from '@reduxjs/toolkit'
import scw from './scwStore/scwProductionSlice'
import scws from './scwStore/scwProductionSlices'

const reducer = combineReducers({
    scws,
})

export default reducer
