import React, { useEffect, useState } from 'react';
import { handleSuccess, handleError } from '../utils/toast';
import axios, { all } from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export default function AdminPanel() {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [displayAllUsers, setDisplayAllUsers] = useState(false);
    const [displayNames, setDisplayNames] = useState(false);
    const [displyByDate, setDisplayByDate] = useState(false);
    const [searchByDate, setSearchByDate] = useState('');
    const [searchByName, setSearchByName] = useState('');
    // console.log(searchByName);
    const navigate = useNavigate();
    const searchByNameHandler = async () => {
        // db connection
        setDisplayNames(true);
        setLoading(true);
        console.log(searchByName);

        // axios.get(`https://pay-turn-app-api.vercel.app/addTransaction/findAllMembersByAdmin`, {
        //     headers: {
        //         'token': localStorage.getItem('payTurnAuthToken')
        //     }
        // })
        //     .then((res) => {
        //         handleSuccess("Data Fetched Successfully");
        //         // let temp = res.data.data;
        //         // temp.sort((u,v)=>{
        //         //     return u<v;
        //         // });
        //         // setAllUsers(allUsers);
        //         // console.log("ALL members Data");
        //         // console.log(res.data.data);
        //     })
        //     .catch(err => {
        //         handleError("Session Expired");
        //     });
        setLoading(false);
    }
    const searchByDateHandler = () => {
        // db connection
        setDisplayByDate(true);
        console.log(searchByDate);
    }

    const handleLogoutAdmin = () => {
        localStorage.removeItem('payTurnAuthToken');
        localStorage.removeItem('payTurnUsername');
        localStorage.removeItem('payTurnName');
        localStorage.removeItem('payTurnIsAuth');
        localStorage.removeItem('payTurnRole');
        handleSuccess("Logged out successfully");
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    }

    useEffect(() => {
        if (localStorage.getItem('payTurnRole') !== localStorage.getItem('payTurnUsername')) {
            localStorage.removeItem('payTurnAuthToken');
            localStorage.removeItem('payTurnName');
            localStorage.removeItem('payTurnUsername');
            localStorage.removeItem('payTurnIsAuth');
            localStorage.removeItem('payTurnRole');
            handleError("Not an Admin");
            setTimeout(() => {
                navigate('/login');
            }, 500);
            return;
        }
        axios.get(`https://pay-turn-app-api.vercel.app/addTransaction/findAllMembersByAdmin`, {
            headers: {
                'token': localStorage.getItem('payTurnAuthToken')
            }
        })
            .then((res) => {
                handleSuccess("Data Fetched Successfully");
                let temp = res.data.data;

                // Sort the array by the 'name' property in ascending order
                temp.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
                setAllUsers(temp);
                // console.log("ALL members Data");
                // console.log(temp);
                handleSuccess('data fetched successfully');
                // console.log(allUsers);


            })
            .catch(err => {
                handleError("Session Expired");

                localStorage.removeItem('payTurnAuthToken');
                localStorage.removeItem('payTurnName');
                localStorage.removeItem('payTurnUsername');
                localStorage.removeItem('payTurnIsAuth');
                localStorage.removeItem('payTurnRole');

                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            });
        // allUsers.forEach(val => {
        //     console.log(val.name);

        // });
    }, []);
    return (
        <div className='container'>
            <div className="container">
                <div className="container text-center">
                    <h1>Admin Panel</h1>
                </div>
                <div className='container text-right'>
                    <button className='btn btn-danger mb-2' onClick={handleLogoutAdmin}> Logout </button>
                </div>
                <div className=' container myborder pt-2 pb-2'>
                    <label htmlFor="members">
                        <h4></h4><b>Fetch all Members</b> &nbsp;
                    </label>
                    <div className='text-right'>
                        <button className='btn btn-info mb-2 ml-5' onClick={() => { setDisplayAllUsers(!displayAllUsers) }}> Fetch </button>
                    </div>
                    {
                        displayAllUsers &&
                        <div className='myborder p-1'>
                            <ol>
                                {
                                    allUsers.map((user, index) => (
                                        <div key={index} style={{ borderBottom: "red" }}>
                                            <li>
                                                <div className='mt-2'>
                                                    <b style={{ color: "red" }}>{user.name}</b>
                                                    <div>
                                                        <b>Username: </b> {user.username}
                                                    </div>
                                                    <div>
                                                        <b>DB _id: </b>{user._id}
                                                    </div>
                                                    <div className='password-container'>
                                                        <b>Password: </b> {user.password}
                                                    </div>
                                                    <div>
                                                        <b>CreatedAt: </b> {user.createdAt}
                                                    </div>
                                                    <div>
                                                        <b>UpdatedAt: </b> {user.updatedAt}

                                                    </div>
                                                </div>

                                            </li>
                                        </div>
                                    ))
                                }
                            </ol>
                        </div>
                    }
                </div>

                <div className='mt-2 container myborder pt-2 pb-2'>
                    <label htmlFor="name">
                        <b>Search by name</b> &nbsp;
                    </label>
                    <select name="name" id="" onClick={(value => setSearchByName(value.target.value))}>
                        {
                            allUsers.map((name, index) => (
                                <option key={index} value={name.username}>{name.name} - {name.username}</option>
                            ))}
                    </select>
                    <div className='text-right'>
                        <button className='btn btn-info mb-2' onClick={searchByNameHandler}> Search </button>
                    </div>
                    {
                        displayNames &&
                        <div className="details myborder p-1">All details here
                            <div className='text-right'>
                                <button className='btn btn-info' onClick={() => setDisplayNames(false)}>close</button>
                            </div>
                        </div>
                    }
                </div>

                <div className='mt-2 container myborder pt-2 pb-2'>
                    <label htmlFor="date">
                        <b> Search by date</b> &nbsp;
                    </label>
                    <input type="date" name="date" id="" />
                    <div className='text-right'>
                        <button className='btn btn-info mb-2' onClick={searchByDateHandler}> Search </button>
                    </div>
                    {
                        displyByDate &&
                        <div className="details myborder p-1">All details here
                            <div className='text-right'>
                                <button className='btn btn-info' onClick={() => setDisplayByDate(false)}>close</button>
                            </div>
                        </div>
                    }
                </div>

                <div className='mt-2 container myborder pt-2 pb-2'>
                    <label htmlFor="name">
                        <b>Change Password of </b> &nbsp;
                    </label>
                    <select name="name" id="">
                        {/* {
                            allUsers.map((name, index) => (
                                <option key={index} value={name}>{name}</option>
                            ))} */}
                    </select>
                    <div className='text-right'>
                        <button className='btn btn-info mb-2'> Change </button>
                    </div>
                </div>

                <div className='mt-2 container myborder pb-2 pt-2'>
                    <label htmlFor="delete">
                        <b>Delete Account of </b> &nbsp;
                    </label>
                    <select name="delete" id="">
                        {/* {
                            allUsers.map((name, index) => (
                                <option key={index} value={name}>{name}</option>
                            ))} */}
                    </select>
                    <div className='text-right'>
                        <button className='btn btn-info mb-2'> Delete </button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}