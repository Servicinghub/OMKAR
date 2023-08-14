import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import NotFound from '../pages/NotFound';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const NotFoundRoute={
        path:'*',
        element:<NotFound/>
    };
    return useRoutes([NotFoundRoute, MainRoutes, LoginRoutes]);
}
