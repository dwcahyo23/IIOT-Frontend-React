import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'example-component',
    title: 'Example',
    translate: 'EXAMPLE',
    type: 'item',
    icon: 'heroicons-outline:star',
    url: 'example',
  },
  {
    id: 'apps',
    title: 'Applications',
    subtitle: 'Custom made application designs',
    type: 'group',
    icon: 'heroicons-outline:cube',
    translate: 'APPLICATIONS',
    children: [
      {
        id: 'apps.mnpreventive',
        title: 'MN Preventive',
        type: 'collapse',
        icon: 'heroicons-outline:shopping-cart',
        translate: 'ECOMMERCE',
        children: [
          {
            id: 'mn-prreventive-items',
            title: 'Items',
            type: 'item',
            url: 'apps/mn-preventive/items',
            end: true,
          },
        ],
      },
    ],
  },
];

export default navigationConfig;
