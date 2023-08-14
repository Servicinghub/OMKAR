import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';
import { Navigate } from '../../node_modules/react-router-dom/dist/index';
import ProtectedRoute from './ProtectedRoute';
import NotFound from '../pages/NotFound';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard')));


// render - sample page
// const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
// const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element:<ProtectedRoute><MainLayout /></ProtectedRoute>,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        }
    ]
};

export default MainRoutes;
