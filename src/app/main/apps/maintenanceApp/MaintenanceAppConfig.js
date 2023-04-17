import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import MaintenanceApp from './MaintenanceApp'

const Machines = lazy(() => import('./machines/Machines'))
const Course = lazy(() => import('./machine/Course'))
const Item = lazy(() => import('./createItem/Item'))

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
                    path: 'course/:uuid/*',
                    element: <Course />,
                },
                {
                    path: 'machines',
                    element: <Machines />,
                },
                {
                    path: 'item/:itemID',
                    element: <Item />,
                },
            ],
        },
    ],
}

export default MaintenanceAppConfig
