import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import authRoles from '../../../auth/authRoles'

import AcipSystem from './AcipSystem'
const Acip = lazy(() => import('./Menu/Acip'))

const AcipSystemConfig = {
    settings: {
        layout: {},
    },
    auth: authRoles.acip,
    routes: [
        {
            path: 'apps/AcipSystem',
            element: <AcipSystem />,
            children: [
                {
                    path: '',
                    element: <Navigate to="/apps/acipSystem/acip" />,
                },
                {
                    path: 'acip',
                    element: <Acip />,
                },
            ],
        },
    ],
}

export default AcipSystemConfig
