import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import MaintenanceApp from './MaintenanceApp'

const Machines = lazy(() => import('./machines/Machines'))

const MaintenanceAppConfig = {
    settings: {
        layout: {},
    },
    routes: [
        {
            path: 'apps/maintenanceApp',
            element: <MaintenanceApp />,
            children: [
                {
                    path: '',
                    element: <Navigate to="/apps/maintenanceApp/machines" />,
                },
                {
                    path: 'machines',
                    element: <Machines />,
                },
            ],
        },
    ],
}

export default MaintenanceAppConfig
