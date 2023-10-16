import { lazy } from 'react'
import { authRoles } from 'src/app/auth'

const MaintenanceDashboard = lazy(() => import('./maintenanceDashboard'))
const PrintApSheet = lazy(() => import('./tabs/widgetTab/PrintApSheet'))

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
        {
            path: 'dashboards/maintenance/print/:uuid/:sheet_no',
            element: <PrintApSheet />,
        },
    ],
}

export default MaintenanceDashboardConfig
