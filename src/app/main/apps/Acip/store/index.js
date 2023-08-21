import { combineReducers } from '@reduxjs/toolkit'

import genba from './genba/genbaAcipSlice'
import genbaOne from './genba/genbaAcipOneSlice'

const reducer = combineReducers({
    genba,
    genbaOne,
})

export default reducer
