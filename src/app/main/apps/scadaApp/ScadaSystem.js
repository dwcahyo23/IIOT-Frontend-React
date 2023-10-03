import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import withReducer from 'app/store/withReducer'
import reducer from './store'

import { initZbSlice } from './store/machinesSlice'

function ScadaSystem() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initZbSlice())
    }, [])

    return <Outlet />
}

export default withReducer('ScadaApp', reducer)(ScadaSystem)
