import { combineReducers } from '@reduxjs/toolkit'

import genbas from './genba/genbaAcipSlices'
import genba from './genba/genbaAcipSlice'

const reducer = combineReducers({
    genbas,
    genba,
})

export default reducer
