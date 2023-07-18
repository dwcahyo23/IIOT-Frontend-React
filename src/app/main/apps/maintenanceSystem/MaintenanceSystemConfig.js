import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import authRoles from '../../../auth/authRoles'
import MaintenanceSystem from './MaintenanceSystem'

// const MachineChild = lazy(() => import('./machineChildren/MachineChildren'))
const MachineChild = lazy(() => import('./machineChildren/MachineChildren'))
const Machines = lazy(() => import('./machinesParent/Machines'))

const MaintenanceSystemConfig = {
    settings: {
        layout: {},
    },
    auth: authRoles.admin,
    routes: [
        {
            path: 'apps/MaintenanceSystem',
            element: <MaintenanceSystem />,
            children: [
                {
                    path: '',
                    element: <Navigate to="/apps/maintenanceSystem/machines" />,
                },
                {
                    path: 'machines',
                    element: <Machines />,
                },
                {
                    path: 'machines/:uuid',
                    element: <MachineChild />,
                },

                {
                    path: 'machines/:uuid/:sheet_no',
                    element: <MachineChild />,
                },
            ],
        },
    ],
}

export default MaintenanceSystemConfig
