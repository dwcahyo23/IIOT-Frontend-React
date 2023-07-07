import AdminRole from './AdminRole'
import authRoles from '../../../auth/authRoles'

const AdminRoleConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    auth: authRoles.admin, // ['admin']
    routes: [
        {
            path: 'auth/admin-role-example',
            element: <AdminRole />,
        },
    ],
}

export default AdminRoleConfig
