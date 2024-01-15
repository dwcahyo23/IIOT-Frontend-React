import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import withReducer from 'app/store/withReducer'
import reducer from './store'
import { gete3viewMasterMachineSlices } from './store/master/e3viewMasterMachineSlices'
import { gete3viewMasterFailCode } from './store/master/e3viewMasterFailCodeSlices'
import { gete3viewEquipmentInfo } from './store/statusBoard/e3viewEquipmentInfoSlices'

function E3viewApp() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(gete3viewMasterMachineSlices())
        dispatch(gete3viewMasterFailCode())
        dispatch(gete3viewEquipmentInfo())
    }, [dispatch])

    return <Outlet />
}

export default withReducer('e3view', reducer)(E3viewApp)
