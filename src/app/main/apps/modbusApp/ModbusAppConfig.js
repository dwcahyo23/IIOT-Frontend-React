import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import ModbusApp from './ModbusApp'
import authRoles from '../../../auth/authRoles'

const Address = lazy(() => import('./createAddress/Address'))
const Machines = lazy(() => import('./machines/Machines'))

const ModbusAppConfig = {
    settings: {
        layout: {},
    },
    routes: [
        {
            path: 'apps/modbusApp',
            element: <ModbusApp />,
            children: [
                {
                    path: '',
                    element: <Navigate to="/apps/modbusApp/machines" />,
                },
                {
                    path: 'machines',
                    element: <Machines />,
                },
                {
                    path: 'address/:addressId',
                    element: <Address />,
                },
            ],
        },
    ],
}

export default ModbusAppConfig
