import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleSuccess } from './utils/toast';
import { handleError } from './utils/toast';
import { handleWarning } from './utils/toast';
import axios from 'axios';
import Spin from './utils/Spin';

export default function SignUp() {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [existingUsername, setExistingUsername] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        rePassword: '',
        agreeTerms: false
    });
    const [loading, setLoading] = useState(false);

    const handleUsernameType = (value) => {
        if (existingUsername === '') {
            setError(false);
        }
        else if (existingUsername === value) {
            setError(true);
        } else return setError(false);
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // console.log(name, value, type, checked);
        if (name === "username") {
            handleUsernameType(value);
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.name === '') {
            return handleError("Please enter your name!");
        }
        if (formData.username === '') {
            return handleError("Please enter your username!");
        }
        if (formData.password === '') {
            return handleError("Please enter your password!");
        }
        if (formData.password !== formData.rePassword) {
            return handleError("Passwords don't match!");
        }
        if (!formData.agreeTerms) {
            return handleWarning("Please agree to the terms of service.");
        }
        let f = false;
        // console.log('Form submitted:', formData);
        setLoading(true);
        await axios.get("https://pay-turn-app-api.vercel.app/addTransaction/checkUsername?username=" + formData.username)
            .then((data) => {
                // console.log(data);
                if (!data.data.flag) {
                    handleWarning("Username already exists!");
                    setError(true);
                    f = true;
                    setExistingUsername(formData.username);
                    return;
                }
            }).catch((error) => {
                handleError("Some error occured!");
                navigate('/signup');
                return;
            });
        setLoading(false);

        if (f) return;
        const newUser = {
            name: formData.name,
            username: formData.username,
            password: formData.password,
            rePassword: formData.rePassword
        };

        setLoading(true);

        await axios.post("https://pay-turn-app-api.vercel.app/auth/signup", newUser)
            .then((data) => {
                // console.log(data);
                console.log("signup successful! ");
                handleSuccess("You are successfully registered!");
                setFormData({
                    name: '',
                    username: '',
                    password: '',
                    rePassword: '',
                    agreeTerms: false
                });
                setTimeout(() => {
                    navigate('/login');
                }, 500);
            })
            .catch((error) => {
                console.log(error);
                handleError("Some error occured!");
            });
        setError(false);
    };

    const handleLogin = () => {
        // console.log('Already have an account');
        navigate('/login');
    }
    return (
        <div className='container mt-2'>
            <div className="container">
                <div className="container signwrapper">
                    <h2 className="form-title">Sign up</h2>
                    <form className="register-form" id="register-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input type="text" name="name" autoFocus id="name" placeholder="Your Name" onChange={handleChange} value={formData.name} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username:&nbsp;&nbsp;</label>
                            <input type="text" name="username" id="username" placeholder="Your Username" onChange={handleChange} value={formData.username} />
                            <div className="errormsgDiv">
                                {error && <span className='errormsg'>* user already exists!</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:&nbsp;&nbsp;&nbsp;</label>
                            <input type="password" name="password" id="password" placeholder="Password" onChange={handleChange} value={formData.password} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rePassword">Re-Enter:&nbsp;&nbsp;&nbsp;</label>
                            <input type="password" name="rePassword" id="rePassword" placeholder="Repeat your password" onChange={handleChange} value={formData.rePassword} />
                        </div>
                        <div className="form-group">
                            <input type="checkbox" name="agreeTerms" id="agreeTerms" className="agree-term" onChange={handleChange} checked={formData.agreeTerms} />
                            <label htmlFor="agreeTerms" className="label-agree-term">&nbsp;&nbsp; I agree to all statements in <a href="#" className="term-service">Terms of service</a>
                            </label>
                        </div>
                        <div className="form-group form-button">
                            <button type="submit" name="signup" id="signup" className="form-submit">Register</button>
                        </div>
                        <div>
                            {
                                loading && <Spin/>
                            }
                        </div>
                    </form>
                    <div className="i-am-already" onClick={handleLogin}>I am already a member. <u>Login</u></div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

