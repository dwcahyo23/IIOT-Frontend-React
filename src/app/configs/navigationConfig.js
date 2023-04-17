import i18next from 'i18next'
import ar from './navigation-i18n/ar'
import en from './navigation-i18n/en'
import tr from './navigation-i18n/tr'

i18next.addResourceBundle('en', 'navigation', en)
i18next.addResourceBundle('tr', 'navigation', tr)
i18next.addResourceBundle('ar', 'navigation', ar)

const navigationConfig = [
    {
        id: 'apps',
        title: 'Applications',
        type: 'group',
        icon: 'heroicons-outline:cube',
        translate: 'APPLICATIONS',
        children: [
            // {
            //     id: 'apps.maintenance',
            //     title: 'Maintenance',
            //     type: 'collapse',
            //     icon: 'heroicons-outline:academic-cap',
            //     url: '/apps/maintenanceApp',
            //     translate: 'Maintenance',
            //     children: [
            //         {
            //             id: 'apps.maintenance.newitem',
            //             title: 'New Item',
            //             type: 'item',
            //             url: '/item/new',
            //         },
            //     ],
            // },

            {
                id: 'apps.maintenance',
                title: 'Maintenance System',
                type: 'collapse',
                icon: 'heroicons-outline:academic-cap',
                translate: 'Maintenance',
                children: [
                    {
                        id: 'mn-maintenance',
                        title: 'Machines',
                        type: 'item',
                        url: '/apps/maintenanceApp',
                        end: true,
                    },
                    {
                        id: 'mn-newitem',
                        title: 'New Item',
                        type: 'item',
                        url: 'apps/maintenanceApp/item/new',
                    },
                ],
            },

            // {
            //     id: 'apps.mnpreventive',
            //     title: 'MN Preventive',
            //     type: 'collapse',
            //     icon: 'heroicons-outline:shopping-cart',
            //     translate: 'Preventive',
            //     children: [
            //         {
            //             id: 'mn-prreventive-items',
            //             title: 'Items',
            //             type: 'item',
            //             url: 'apps/mn-preventive/items',
            //             end: true,
            //         },
            //         {
            //             id: 'mn-prreventive-new-item',
            //             title: 'New Item',
            //             type: 'item',
            //             url: 'apps/mn-preventive/items/new',
            //         },
            //     ],
            // },
        ],
    },
]

export default navigationConfig
