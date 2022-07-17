import config from '~/config';

// Layouts
import { HeaderOnly } from '~/layouts';

// Pages
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import Account from '~/pages/Account';
import Students from '~/pages/Students';
import Rooms from '~/pages/Rooms/room';
import Payment from '~/pages/Payment';
import Login from '~/pages/Login/Login';

// Public routes
const publicRoutes = [{ path: config.routes.login, component: Login, layout: null }];

const privateRoutes = [
    { path: config.routes.home, component: Dashboard },
    { path: config.routes.dashboard, component: Dashboard },
    { path: config.routes.accounts, component: Account },
    { path: config.routes.students, component: Students },
    { path: config.routes.rooms, component: Rooms },
    { path: config.routes.payment, component: Payment },
    { path: config.routes.profile, component: Profile },
];

export { publicRoutes, privateRoutes };
