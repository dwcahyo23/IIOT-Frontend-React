import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import withReducer from 'app/store/withReducer'
import { getErpMnSlices } from './store/erpStore/erpMnSlices'
import { getMachineMnSlices } from './store/machineStore/machineMnSlices'
import { getReportSlices } from './store/reportStore/reportMnSlices'
import { getRequestSlices } from './store/requestStore/requestMnSlices'
import { getSparepartSlices } from './store/sparepartStore/sparepartMnSlices'
import { getStokSlices } from './store/stokStore/stokMnSlices'
import reducer from './store'

function MaintenanceApp() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getErpMnSlices())
        dispatch(getMachineMnSlices())
        dispatch(getReportSlices())
        dispatch(getRequestSlices())
        dispatch(getSparepartSlices())
        dispatch(getStokSlices())
    }, [dispatch])

    return <Outlet />
}

export default withReducer('mnApp', reducer)(MaintenanceApp)
