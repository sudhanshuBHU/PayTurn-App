import React from 'react';
import '../style.css';

export default function NavbarHead() {
    return (
        <div className="container mt-3">
            <div className="container container d-flex justify-content-between">
                <div className=" container" id='navbarhead'>
                    Pay-Turn
                </div>
                <div className="container d-flex ">
                        <button className='ml-auto' id='navbtn'>Logout</button>
                </div>
            </div>
        </div>
    )
}
