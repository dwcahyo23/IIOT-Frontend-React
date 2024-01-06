import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { authRoles } from 'src/app/auth'

import ProductionApp from './ProductionApp'
import routes from 'app/configs/routesConfig'
const ProductionMachines = lazy(() => import('./menu/ProductionAppMachines'))

const ProductionAppConfig = {
    setting: {
        layout: {},
    },
    auth: authRoles.admin,
    routes: [
        {
            path: 'apps/PdApp',
            element: <ProductionApp />,
            children: [
                {
                    path: '',
                    element: (
                        <Navigate to="/apps/PrductionApp/menu/ProductionAppMachines" />
                    ),
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
