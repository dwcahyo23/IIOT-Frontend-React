import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { authRoles } from 'src/app/auth'

import ProductionApp from './ProductionApp'
const ProductionMachines = lazy(() => import('./menu/ProductionAppMachines'))

const ProductionAppConfig = {
    setting: {
        layout: {},
    },
    auth: authRoles.admin,
    routes: [
        {
            path: 'apps/productionApp',
            element: <ProductionApp />,
            children: [
                {
                    path: '',
                    element: <Navigate to="/apps/productionApp/production" />,
                },
                {
                    path: 'production',
                    element: <ProductionMachines />,
                },
            ],
        },
    ],
}

export default ProductionAppConfig
