import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import authRoles from '../../../auth/authRoles'

import E3viewApp from './E3viewApp'
const E3view = lazy(() => import('./menu/master/E3viewAppMachineInfo'))

const E3viewAppConfig = {
    settings: {
        layout: {},
    },
    auth: authRoles.user,
    routes: [
        {
            path: 'apps/e3ivewApp',
            element: <E3viewApp />,
            children: [
                {
                    path: '',
                    element: (
                        <Navigate to="/apps/e3ivewApp/E3viewAppMachineInfo" />
                    ),
                },
                {
                    path: 'E3viewAppMachineInfo',
                    element: <E3view />,
                },
            ],
        },
    ],
}

export default E3viewAppConfig
