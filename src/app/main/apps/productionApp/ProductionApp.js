import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import withReducer from 'app/store/withReducer'

import { getScwSlices } from './store/scwStore/scwProductionSlices'
import reducer from './store'

function ProductionApp() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getScwSlices())
    }, [dispatch])

    return <Outlet />
}

export default withReducer('pdApp', reducer)(ProductionApp)
