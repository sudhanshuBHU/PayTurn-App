import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Toast } from 'primereact/toast';
// import { Button } from 'primereact/button';   
// import { useRef } from 'react';
export default function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        rePassword: '',
        agreeTerms: false
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.rePassword) {
            alert("Passwords don't match!");
            return;
        }
        if (!formData.agreeTerms) {
            alert("Please agree to the terms of service.");
            return;
        }
        console.log('Form submitted:', formData);
        // Here you would typically send the data to your backend
    };
    const handleLogin = () => {
        console.log('Already have an account');
        navigate('/login');
    }
    return (
        <div className='container'>
            <div className="container">
                <div className="container signwrapper">
                    <h2 className="form-title">Sign up</h2>
                    <form className="register-form" id="register-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input type="text" name="name" id="name" placeholder="Your Name" onChange={handleChange} value={formData.name} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input type="text" name="username" id="username" placeholder="Your Username" onChange={handleChange} value={formData.username} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input type="password" name="password" id="password" placeholder="Password" onChange={handleChange} value={formData.password} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rePassword">Re-Enter:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input type="password" name="rePassword" id="rePassword" placeholder="Repeat your password" onChange={handleChange} value={formData.rePassword} required />
                        </div>
                        <div className="form-group">
                            <input type="checkbox" name="agreeTerms" id="agreeTerms" className="agree-term" onChange={handleChange} checked={formData.agreeTerms} required />
                            <label htmlFor="agreeTerms" className="label-agree-term">
                                <span><span></span></span>&nbsp;&nbsp; I agree to all statements in <a href="#" className="term-service">Terms of service</a>
                            </label>
                        </div>
                        <div className="form-group form-button">
                            <button type="submit" name="signup" id="signup" className="form-submit">Register</button>
                        </div>
                    </form>
                    <div className="i-am-already" onClick={handleLogin}>I am already a member</div>
                </div>
            </div>
        </div>
    )
}

