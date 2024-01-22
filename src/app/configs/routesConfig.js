import FuseUtils from '@fuse/utils'
import FuseLoading from '@fuse/core/FuseLoading'
import { Navigate } from 'react-router-dom'
import settingsConfig from 'app/configs/settingsConfig'
import appsConfig from '../main/apps/appsConfig'
import SignInConfig from '../main/sign-in/SignInConfig'
import SignUpConfig from '../main/sign-up/SignUpConfig'
import SignOutConfig from '../main/sign-out/SignOutConfig'
import Error404Page from '../main/404/Error404Page'
import ExampleConfig from '../main/example/ExampleConfig'
import AuthRoleConfig from '../main/auth/AuthRoleConfig'
import dashboardsConfigs from '../main/dashboard/dashboardsConfigs'
import Hero200Page from '../main/200/Hero200Page'

const routeConfigs = [
    ...appsConfig,
    // ...AuthRoleConfig,
    // ...dashboardsConfigs,
    // ExampleConfig,
    SignOutConfig,
    SignInConfig,
    SignUpConfig,
]

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(
        routeConfigs,
        settingsConfig.defaultAuth
    ),
    {
        path: '/',
        element: <Hero200Page />,
        auth: settingsConfig.defaultAuth,
    },
    {
        path: 'loading',
        element: <FuseLoading />,
    },
    {
        path: '404',
        element: <Error404Page />,
    },
    {
        path: '*',
        element: <Navigate to="404" />,
    },
]

export default routes
