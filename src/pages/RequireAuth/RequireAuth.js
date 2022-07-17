import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const login = localStorage.getItem('auth');

    // auth?.roles?.find((role) => allowedRoles?.includes(role))
    return auth.status === allowedRoles && login ? (
        <Outlet />
    ) : auth?.message ? (
        <Navigate to="/oops" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
