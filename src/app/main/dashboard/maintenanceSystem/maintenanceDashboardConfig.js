import { lazy } from 'react'
import { authRoles } from 'src/app/auth'

const MaintenanceDashboard = lazy(() => import('./maintenanceDashboard'))

const MaintenanceDashboardConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    // auth: authRoles.admin,
    routes: [
        {
            path: 'dashboards/maintenance',
            element: <MaintenanceDashboard />,
        },
    ],
}

export default MaintenanceDashboardConfig
