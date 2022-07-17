import { Fragment } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import { Wrapper } from './components/Popper';
import Login from './pages/Login';
import RequireAuth from './pages/RequireAuth/RequireAuth';
import NotFound from './pages/NotFound';

const ROLE = {
    status: 200,
};

function App() {
    const auth = localStorage.getItem('auth');

    return (
        <Routes>
            <Route path="/" element={<Outlet />}>
                {/* Public route */}
                {!auth && <Route path="login" element={<Login />} />}
                <Route path="oops" element={<NotFound />} />

                {/* Protect this route */}
                <Route element={<RequireAuth allowedRoles={ROLE.status} />}>
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <DefaultLayout>
                                        <Page />
                                    </DefaultLayout>
                                }
                            />
                        );
                    })}
                </Route>

                {/* catch all */}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
