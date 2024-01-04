import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { authRoles } from 'src/app/auth'

import MaintenanceApp from './MaintenanceApp'
import routes from 'app/configs/routesConfig'
const MaintenanceMachines = lazy(() =>
    import('./menu/machine/MaintenanceAppMachines')
)
const MaintenanceErps = lazy(() => import('./menu/erp/MaintenanceAppErps'))

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
                    path: 'erps',
                    element: <MaintenanceErps />,
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
