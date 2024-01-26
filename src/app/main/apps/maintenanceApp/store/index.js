import { combineReducers } from '@reduxjs/toolkit'
import erps from './erpStore/erpMnSlices'
import machines from './machineStore/machineMnSlices'
import machine from './machineStore/machineMnSlice'
import reports from './reportStore/reportMnSlices'
import report from './reportStore/reportMnSlice'
import requests from './requestStore/requestMnSlices'
import request from './requestStore/requestMnSlice'
import spareparts from './sparepartStore/sparepartMnSlices'
import sparepart from './sparepartStore/sparepartMnSlice'
import stoks from './stokStore/stokMnSlices'
import stok from './stokStore/stokMnSlice'
import users from './userStore/userMnSlices'
import erpsstock from './erpStockStore/erpStockMnSlices'
import erpsisue from './erpIsueStore/erpIsueMnSlices'
import erpsstockcontrol from './erpStockControlStore/erpStockControlMnSlices'
import erptockcontrol from './erpStockControlStore/erpStockControlMnSlice'

const reducer = combineReducers({
    erps,
    machines,
    machine,
    reports,
    report,
    requests,
    request,
    spareparts,
    sparepart,
    stoks,
    stok,
    users,
    erpsstock,
    erpsisue,
    erpsstockcontrol,
    erptockcontrol,
})

export default reducer
