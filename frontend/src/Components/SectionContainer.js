import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ReactTyped } from "react-typed";


export default function SectionContainer() {
    const navigate = useNavigate();
    const handleRegister = () => {
        navigate('/signup');
    }
    const handleLogin = () => {
        navigate('/login');
    }
    return (
        <div className='container mt-2'>
            <div className='container'>
                <div className='container myborder wrapperSectionContainer'>
                    <div className='container-section'>
                        <div className='sectionHeading'>
                            Welcome to{" "}
                            <ReactTyped
                                strings={["PayTurn!", "Family!"]}
                                typeSpeed={150}
                                loop
                                backSpeed={30}
                                cursorChar=">"
                                showCursor={true}
                            />
                        </div>
                        <div className='sectionContent'>
                            <p>
                                {" "}
                                <ReactTyped
                                    strings={["The ultimate platform for seamless tracking of your financial exchanges and personal lending. Whether you're managing individual transactions or organizing larger financial activities, PayTurn simplifies the process, keeping everything organized and accessible."]}
                                    typeSpeed={50}
                                    backSpeed={30}
                                    cursorChar=">"
                                    showCursor={true}
                                />
                            </p>
                        </div>
                    </div>
                    <div className='sectionButton'>
                        <button className='btn btn-info mr-5 ' onClick={handleRegister}>Register</button>
                        <button className='btn btn-info ' onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
