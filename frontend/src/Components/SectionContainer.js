import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function SectionContainer() {
    const navigate = useNavigate();
    const handleRegister = () =>{
        navigate('/signup');
    }
    const handleLogin = () =>{
        navigate('/login');
    }
    return (
        <div className='container mt-4'>
            <div className='container'>
                <div className='container border p-3 d-flex justify-content-center'>
                    <button className='btn btn-info mr-5' onClick={handleRegister}>Register</button>
                    <button className='btn btn-secondary' onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    )
}
