import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from './utils/toast';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import Spin from './utils/Spin';
// import { useDispatch } from 'react-redux';
// import { setName, setUser } from '../Redux/features/DataSlice';

export default function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    // const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            return handleError('Please enter username and password!');
        }

        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:8000/auth/login', {
                username,
                password
            });
            setIsLoading(false);
            // console.log(response);
            if (response.data.success === false) {
                handleError(response.data.message);
                navigate('/login');
                return;
            }
            handleSuccess('You are successfully logged in!');
            setUsername('');
            setPassword('');

            localStorage.setItem('payTurnAuthToken', response.data.token);
            localStorage.setItem('payTurnUsername', response.data.username);
            localStorage.setItem('payTurnName', response.data.name);
            localStorage.setItem('payTurnIsAuth', 'true');

            // dispatch(setUser(response.data.username));
            // dispatch(setName(response.data.name));

            setTimeout(() => {
                navigate('/dashboard');
            }, 500);
        } catch (err) {
            console.log("err.response.data.message", err.response.data.message);
            handleError("login failed!");
        }

        // console.log('Login attempt with:', username, password);
    }
    const handleAlready = () => {
        // console.log('Already have an account');
        navigate('/signup');
    }

    return (
        <div className="container">
            <div className="container">
                <div className="container signwrapper">
                    <h2 className='form-title'>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Username:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input
                                type="username"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoFocus
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" id='signupLogin'>Log In</button>
                    </form>
                    <div className='spinner-wrapper'>
                        <div className='spinner-container'>
                            {isLoading && <Spin />}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="agreeTerms" className="alreadyHaveAccount" onClick={handleAlready}>
                            <span><span></span></span> Don't have a account. <u>Signup</u>
                        </label>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

