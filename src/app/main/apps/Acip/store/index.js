import { combineReducers } from '@reduxjs/toolkit'

import genba from './genba/genbaAcipSlice'

const reducer = combineReducers({
    genba,
})

export default reducer
