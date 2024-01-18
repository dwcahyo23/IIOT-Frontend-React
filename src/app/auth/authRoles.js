/**
 * Authorization Roles
 */
const authRoles = {
    admin: ['admin'],
    staff: ['admin', 'staff'],
    user: ['admin', 'staff', 'user'],
    acip: ['acip'],
    production: ['production'],
    maintenance: ['maintenance'],
    onlyGuest: [],
}

export default authRoles
