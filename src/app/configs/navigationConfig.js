// import i18next from 'i18next'
// import ar from './navigation-i18n/ar'
// import en from './navigation-i18n/en'
// import tr from './navigation-i18n/tr'
import { authRoles } from '../auth'

// i18next.addResourceBundle('en', 'navigation', en)
// i18next.addResourceBundle('tr', 'navigation', tr)
// i18next.addResourceBundle('ar', 'navigation', ar)

const navigationConfig = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        type: 'group',
        icon: 'heroicons-outline:home',
        translate: 'DASHBOARDS',
        children: [
            {
                id: 'dashboards.project',
                title: 'Maintenance System',
                type: 'item',
                auth: authRoles.admin,
                icon: 'heroicons-outline:clipboard-check',
                url: '/dashboards/maintenance',
            },
        ],
    },
    {
        type: 'divider',
        id: 'divider-2',
    },
    {
        id: 'apps',
        title: 'Applications',
        type: 'group',
        icon: 'heroicons-outline:cube',
        translate: 'APPLICATIONS',
        children: [
            {
                id: 'apps.maintenanceSystem',
                title: 'Maintenance Machine',
                type: 'item',
                icon: 'heroicons-outline:desktop-computer',
                auth: authRoles.admin,
                url: '/apps/maintenanceSystem',
            },
            {
                id: 'apps.acipSystem',
                title: 'Genba Acip',
                type: 'item',
                icon: 'heroicons-outline:desktop-computer',
                auth: authRoles.acip,
                url: '/apps/acipSystem',
            },
            {
                id: 'apps.modbus',
                title: 'Maintenance System',
                type: 'collapse',
                auth: authRoles.admin,
                icon: 'heroicons-outline:status-online',
                translate: 'IOT',
                children: [
                    {
                        id: 'modbusApp-mch',
                        title: 'Home',
                        type: 'item',
                        url: '/apps/modbusApp',
                        end: true,
                    },
                    {
                        id: 'modbusApp-new-address',
                        title: 'New address',
                        type: 'item',
                        url: 'apps/modbusApp/address/new',
                    },
                ],
            },
        ],
    },
]

export default navigationConfig
