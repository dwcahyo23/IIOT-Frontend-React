/**
 * Authorization Roles
 */
const authRoles = {
    admin: ['admin'],
    staff: ['admin', 'staff'],
    user: ['admin', 'staff', 'user'],
    acip: ['acip'],
    onlyGuest: [],
}

export default authRoles
