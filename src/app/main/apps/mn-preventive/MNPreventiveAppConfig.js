import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Items = lazy(() => import('./items/Items'));

const MNPreventiveAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/mn-preventive/items',
      element: <Items />,
    },
    {
      path: 'apps/mn-preventive',
      element: <Navigate to="items" />,
    },
  ],
};

export default MNPreventiveAppConfig;
