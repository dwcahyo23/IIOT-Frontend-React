import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Items = lazy(() => import('./items/Items'))

const MNGenbaAppConfig = {
    settings: {
        layout: {},
    },
    routes: [
        {
            path: 'apps/mn-genba/items',
            element: <Items />,
        },
        {
            path: 'apps/mn-genba',
            element: <Navigate to="items" />,
        },
    ],
}

export default MNGenbaAppConfig
