import React from 'react';
import '../style.css';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import header from './utils/heading.png';

export default function NavbarHead() {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    }
    return (
        <div className="container mt-3">
            <div className="container container d-flex justify-content-between headingImgDiv">
                <div className=" container" id='navbarhead' onClick={handleHomeClick}>
                    {/* Pay-Turn */}
                    <img src={header} className='headerImg' alt="header" />
                </div>
            </div>
        </div>
    )
}
