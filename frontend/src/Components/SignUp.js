import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleSuccess } from './utils/toast';
import { handleError } from './utils/toast';
import { handleWarning } from './utils/toast';
import axios from 'axios';

export default function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        rePassword: '',
        agreeTerms: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
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
        // console.log('Form submitted:', formData);
        const newUser = {
            name: formData.name,
            username: formData.username,
            password: formData.password,
            rePassword: formData.rePassword
        };
        await axios.post("http://localhost:8000/auth/signup", newUser)
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
    };

    const handleLogin = () => {
        // console.log('Already have an account');
        navigate('/login');
    }
    return (
        <div className='container'>
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
                    </form>
                    <div className="i-am-already" onClick={handleLogin}>I am already a member. <u>Login</u></div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

