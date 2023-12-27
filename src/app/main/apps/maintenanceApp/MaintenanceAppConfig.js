import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { authRoles } from 'src/app/auth'

import MaintenanceApp from './MaintenanceApp'
import routes from 'app/configs/routesConfig'
const MaintenanceMachines = lazy(() => import('./menu/MaintenanceAppMachines'))

const MaintenanceAppConfig = {
    setting: {
        layout: {},
    },
    auth: authRoles.admin,
    routes: [
        {
            path: 'apps/MnApp',
            element: <MaintenanceApp />,
            children: [
                {
                    path: '',
                    element: (
                        <Navigate to="/apps/maintenanceApp/menu/MaintenanceAppMachines" />
                    ),
                },
                {
                    path: 'machines',
                    element: <MaintenanceMachines />,
                },
            ],
        },
    ],
}

export default MaintenanceAppConfig
