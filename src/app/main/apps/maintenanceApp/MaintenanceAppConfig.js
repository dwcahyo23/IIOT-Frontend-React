import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { authRoles } from 'src/app/auth'

import MaintenanceApp from './MaintenanceApp'
import routes from 'app/configs/routesConfig'
const MaintenanceMachines = lazy(() =>
    import('./menu/machine/MaintenanceAppMachines')
)
const MaintenanceErps = lazy(() => import('./menu/erp/MaintenanceAppErps'))

const MaintenanceInventory = lazy(() =>
    import('./menu/inventory/MaintenanceAppInventory')
)
const DialogErps = lazy(() =>
    import('./components/DialogMenu/DialogWorOrderMenu.js')
)
const MaintenanceErpsStock = lazy(() =>
    import('./menu/erpStock/MaintenanceAppErpsStock')
)

const MaintenanceAppConfig = {
    setting: {
        layout: {},
    },
    auth: authRoles.admin,
    routes: [
        {
            path: 'apps/maintenanceApp',
            element: <MaintenanceApp />,
            children: [
                {
                    path: '',
                    element: <Navigate to="/apps/maintenanceApp/erps" />,
                },
                {
                    path: 'erps',
                    element: <MaintenanceErps />,
                },
                {
                    path: 'machines',
                    element: <MaintenanceMachines />,
                },
                {
                    path: 'inventories',
                    element: <MaintenanceInventory />,
                },
                {
                    path: 'stoks',
                    element: <MaintenanceErpsStock />,
                },
                {
                    path: 'machinesId/:id/:com',
                    element: <DialogErps />,
                },
            ],
        },
    ],
}

export default MaintenanceAppConfig
