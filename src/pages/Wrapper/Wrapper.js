import { Outlet } from 'react-router-dom';

function Wrapper() {
    return (
        <div className="wrapper">
            <Outlet />
        </div>
    );
}

export default Wrapper;
