import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import authRoles from '../../../auth/authRoles'

import ScadaSystem from './ScadaSystem'

const Home = lazy(() => import('./menu/homeScada'))

const ScadaAppConfig = {
    settings: {
        layout: {},
    },
    auth: authRoles.user,
    routes: [
        {
            path: 'apps/scadaApp',
            element: <ScadaSystem />,
            children: [
                {
                    path: '',
                    element: <Navigate to="/apps/scadaApp/home" />,
                },
                {
                    path: 'home',
                    element: <Home />,
                },
            ],
        },
    ],
}

export default ScadaAppConfig
