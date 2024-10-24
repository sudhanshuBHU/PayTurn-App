import React from 'react'
import { useState, useEffect } from 'react';


export default function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempt with:', username, password);
    };

    return (
        <div className="container">
            <div className="container">
                <div className="container signwrapper">
                    <h2 className='form-title'>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" >Username:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input
                                type="username"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
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
                    <div className="form-group">
                        <label htmlFor="agreeTerms" className="label-agree-term" style={{color:"red"}}>
                            <span><span></span></span>&nbsp;&nbsp; Already have a account.
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
