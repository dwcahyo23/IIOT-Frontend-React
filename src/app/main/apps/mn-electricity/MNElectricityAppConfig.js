import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Modbus = lazy(() => import('./modbus/Modbus'))

const MNElectricityAppConfig = {
    settings: {
        layout: {},
    },
    routes: [
        {
            path: 'apps/mn-electricity/modbus',
            element: <Modbus />,
        },
        {
            path: 'apps/mn-electricity',
            element: <Navigate to="modbus" />,
        },
    ],
}

export default MNElectricityAppConfig
