import React from 'react';
import '../style.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function NavbarHead() {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const handleHomeClick = () => {
        navigate('/');
        // localStorage.removeItem('user');
        // window.location.reload();
    }
    return (
        <div className="container mt-3">
            <div className="container container d-flex justify-content-between">
                <div className=" container" id='navbarhead' onClick={handleHomeClick}>
                    Pay-Turn
                </div>
                <div className="container d-flex ">
                    {
                        user === "Loading" ? <button className='ml-auto' id='navbtn'>Logout</button> : ""
                    }
                </div>
            </div>
        </div>
    )
}
