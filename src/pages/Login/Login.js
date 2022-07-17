import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Login.model.scss';

import AuthContext from '~/context/AuthProvider';
import httpRequest from '~/utils/httpRequest';

const cx = classNames.bind(styles);
const LOGIN_URL = '/api-login';

function Login() {
    const { setAuth } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const from = location.state?.from?.pathname || '/';

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [username, password]);

    const handelSubmit = async (e) => {
        e.preventDefault();
        const reqLogin = {
            username,
            password,
        };

        try {
            const res = await httpRequest.post(LOGIN_URL, JSON.stringify(reqLogin));

            const accessCookies = res?.data?.message;
            const roles = res?.data?.status;
            const status = res?.data?.status;
            const message = res?.data?.message;

            setAuth({ username, password, status, message });
            setUsername('');
            setPassword('');
            setSuccess(true);
            localStorage.setItem('auth', true);
            navigate(from, { replace: true });
        } catch (error) {
            if (!error?.res) {
                setErrMsg('No server response');
            } else if (error.res?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (error.res?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

    const renderLoginForm = (
        <section className={cx('login-form')}>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>
                {errMsg}
            </p>
            <h1>Sign In</h1>
            <form onSubmit={handelSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id={cx('username')}
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id={cx('password')}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?
                <br />
                <span className={cx('line')}>
                    {/*put router link here */}
                    <Link className={cx('other')} to="/register">
                        Sign Up
                    </Link>
                </span>
            </p>
        </section>
    );

    const renderRedirectSuccess = (
        <div>
            {/** Redirect login successfully */}
            <Navigate to="/dashboard" state={{ from: location }} replace />
        </div>
    );

    return <div className={cx('container')}>{success ? renderRedirectSuccess : renderLoginForm}</div>;
}

export default Login;
