import { lazy } from 'react'

const MaintenanceDashboard = lazy(() => import('./maintenanceDashboard'))

const MaintenanceDashboardConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: 'dashboards/maintenance',
            element: <MaintenanceDashboard />,
        },
    ],
}

export default MaintenanceDashboardConfig
