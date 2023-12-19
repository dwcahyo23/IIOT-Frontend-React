import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import authRoles from '../../../auth/authRoles'

import AcipApp from './AcipApp'
const Acip = lazy(() => import('./Menu/Acip'))
const AcipDashboard = lazy(() => import('./Menu/AcipDashboard'))

const AcipAppConfig = {
    settings: {
        layout: {},
    },
    auth: authRoles.acip,
    routes: [
        {
            path: 'apps/AcipApp',
            element: <AcipApp />,
            children: [
                {
                    path: '',
                    element: <Navigate to="/apps/acipApp/acip" />,
                },
                {
                    path: 'acip',
                    element: <Acip />,
                },
                {
                    path: 'dashboard',
                    element: <AcipDashboard />,
                },
            ],
        },
    ],
}

export default AcipAppConfig
