import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

import ScadaSystem from './ScadaSystem'

const Home = lazy(() => import('./menu/homeScada'))

const ScadaAppConfig = {
    settings: {
        layout: {},
    },
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
