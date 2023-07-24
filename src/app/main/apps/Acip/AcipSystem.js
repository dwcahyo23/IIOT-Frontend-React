import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import withReducer from 'app/store/withReducer'
import { getGenbaAcip } from './store/genba/genbaAcipSlice'
import reducer from './store'

function AcipSystem() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGenbaAcip())
    }, [dispatch])

    return <Outlet />
}

export default withReducer('genbaAcip', reducer)(AcipSystem)
