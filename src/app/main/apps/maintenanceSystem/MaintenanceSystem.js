import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import withReducer from 'app/store/withReducer'
import { getMachinesCom } from './store/machineParent/machinesComSlice'
import { getMachinesProcess } from './store/machineParent/machinesProcessSlice'
import reducer from './store'

function MaintenanceSystem() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMachinesProcess())
        dispatch(getMachinesCom())
    }, [dispatch])

    return <Outlet />
}

export default withReducer('maintenanceSystem', reducer)(MaintenanceSystem)
