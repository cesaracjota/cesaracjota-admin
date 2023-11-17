import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PublicRoutes = () => {

    const { user } = useSelector(state => state.auth);

    const location = useLocation();

    return(

        user ? <Navigate to={ '/' } state={{ from: location }} replace /> : <Outlet />
    
    )
}

export default PublicRoutes;