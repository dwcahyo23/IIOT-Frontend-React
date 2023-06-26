// import i18next from 'i18next'
// import ar from './navigation-i18n/ar'
// import en from './navigation-i18n/en'
// import tr from './navigation-i18n/tr'

// i18next.addResourceBundle('en', 'navigation', en)
// i18next.addResourceBundle('tr', 'navigation', tr)
// i18next.addResourceBundle('ar', 'navigation', ar)

const navigationConfig = [
    {
        id: 'apps',
        title: 'Applications',
        type: 'group',
        icon: 'heroicons-outline:cube',
        translate: 'APPLICATIONS',
        children: [
            {
                id: 'apps.sparepart',
                title: 'Maintenance',
                type: 'collapse',
                icon: 'heroicons-outline:desktop-computer',
                translate: 'Maintenance',
                children: [
                    {
                        id: 'sparepart-mch',
                        title: 'Home',
                        type: 'item',
                        url: '/apps/maintenanceSystem',
                        end: true,
                    },
                    {
                        id: 'sparepart-new-address',
                        title: 'New address',
                        type: 'item',
                        url: 'apps/maintenanceSystem/sparepart/new',
                    },
                ],
            },

            {
                id: 'apps.modbus',
                title: 'Maintenance System',
                type: 'collapse',
                icon: 'heroicons-outline:status-online',
                translate: 'IIOT',
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
