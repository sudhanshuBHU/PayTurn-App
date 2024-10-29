import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from './utils/toast';
import { ToastContainer } from 'react-toastify';
import Lend from './Lend';
import Section1 from './Section1';
import EntryTransaction from './EntryTransaction';
import axios from 'axios';


export default function Dashboard() {
    const navigate = useNavigate();
    const name = localStorage.getItem('payTurnName');
    const user = localStorage.getItem('payTurnUsername');
    // console.log(user);

    const [isLogin, setIsLogin] = useState(true);
    const [hideEntry, setHideEntry] = useState(false);
    const [hideEntrySec, setHideEntrySec] = useState(true);
    const [takeData, setTakeData] = useState([]);
    const [giveData, setGiveData] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    const handleLogout = () => {

        localStorage.removeItem('payTurnAuthToken');
        localStorage.removeItem('payTurnName');
        localStorage.removeItem('payTurnUsername');
        localStorage.removeItem('payTurnIsAuth');

        setIsLogin(false);
        setHideEntry(false);
        setHideEntrySec(false);

        handleSuccess("Logged out Successfully!");
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    }
    // console.log(giveData, takeData);

    useEffect(() => {
        // console.log(user);

        axios.get(`https://pay-turn-app-api.vercel.app/addTransaction/allTransactionPayer?payer_username=${user}`, {
            headers: {
                'token': localStorage.getItem('payTurnAuthToken')
            }
        })
            .then((res) => {
                handleSuccess("Data Fetched Successfully");
                setGiveData(res.data.data);
                console.log("giveData");
                console.log(res.data.data);

            })
            .catch(err => {
                handleError("Session Expired");
            });


        axios.get(`https://pay-turn-app-api.vercel.app/addTransaction/allTransactionPayee?payee_username=${user}`, {
            headers: {
                'token': localStorage.getItem('payTurnAuthToken')
            }
        })
            .then((res) => {
                // handleSuccess("Data Fetched Successfully");
                setTakeData(res.data.data);
                console.log("takeData");
                console.log(res.data.data);

            })
            .catch(err => {
                handleError("Session Expired");
            });
        axios.get(`https://pay-turn-app-api.vercel.app/addTransaction/allMembers`, {
            headers: {
                'token': localStorage.getItem('payTurnAuthToken')
            }
        })
            .then((res) => {
                // handleSuccess("Data Fetched Successfully");
                setAllUsers(res.data.data);
                // console.log("ALL members Data");
                // console.log(res.data.data);
            })
            .catch(err => {
                handleError("Session Expired");

                localStorage.removeItem('payTurnAuthToken');
                localStorage.removeItem('payTurnName');
                localStorage.removeItem('payTurnUsername');
                localStorage.removeItem('payTurnIsAuth');

                setIsLogin(false);
                setHideEntry(false);
                setHideEntrySec(false);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            });
    }, []);

    return (
        <div className='wrapper'>
            <div className="container">
                <div className="container ">
                    <div className="container d-flex mb-3">
                    {
                        isLogin ? <button className='ml-auto' id='navbtn' onClick={handleLogout}>Logout</button> : ""
                    }
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className="container">
                    <div className="container myborder welcome">
                        Welcome,
                    </div>
                </div>
            </div>
            <Section1 name={name} user={user} />
            <div className="container">
                <div className="container">
                    <div className=' container buttonDashboard'>
                        {
                            hideEntrySec && <button className='btn dashButton' onClick={() => { setHideEntrySec(false); setHideEntry(true); }}>Add Transaction</button>
                        }
                        {
                            hideEntry && <button className='btn dashButton' onClick={() => { setHideEntry(false); setHideEntrySec(true); }}>Hide</button>
                        }
                    </div>
                </div>
            </div>

            {
                hideEntry && <EntryTransaction name={name} user={user} allUsers={allUsers} />
            }
            <Lend takeData={takeData} giveData={giveData} allUsers={allUsers} />
            {/* <Footer /> */}
            <ToastContainer />
        </div>
    )
}
