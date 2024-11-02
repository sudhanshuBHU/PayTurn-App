import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDataGive, setDataTake, setName, setAmount, setUser } from '../Redux/features/DataSlice';

export default function Lend(props) {
    const [runningData, setRunningData] = useState([]);
    // const [user, setUser] = useState("Anshu");
    // const name = localStorage.getItem('payTurnName');
    const user = localStorage.getItem('payTurnUsername');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const [giveData, setGivedata] = useState(props.giveData);
    // const [takeData, setTakeData] = useState(props.takeData);
    // const [members, setMembers] = useState(props.allUsers);

    const finalCalculation = () => {
        const arr = [];
        // console.log(members);
        // console.log(props.allUsers);


        props.allUsers.forEach((val) => {
            arr.push({ name: val.name, username: val.username, amount: 0 });
        })
        // console.log(arr);
        arr.forEach((mem) => {
            if (mem.username !== user)
                props.giveData.forEach((val) => {
                    if (val.payee_username === mem.username) mem.amount = mem.amount + val.price;
                });
        });
        // console.log(arr);
        arr.forEach((mem) => {
            if (mem.username !== user)
                props.takeData.forEach((val) => {
                    if (val.payer_username === mem.username) mem.amount = mem.amount - val.price;
                });
        });
        setRunningData(arr);
        // console.log(arr);

    }

    const handleIndividual = (v_name, amount, v_user) => {
        // console.log(v_name);
        // console.log(v_user);
        
        dispatch(setUser(v_user));
        dispatch(setName(v_name));
        dispatch(setAmount(amount));
        navigate('/lend/individual');
    }

    useEffect(() => {
        finalCalculation();
        dispatch(setDataGive(props.giveData));
        dispatch(setDataTake(props.takeData));
    }, [props.allUsers,props.giveData,props.takeData])

    return (
        <div className='container'>
            <div className="container">
                <div className="container border border-info mt-3">
                    <h3 className='text-center'>Final Standings</h3>
                    <div className='row pt-1 pb-1 font-weight-bold border'>
                        <div className="col-5 border">Payee</div>
                        <div className="col-3 border">Total</div>
                        <div className="col-2 border">Status</div>
                        <div className="col-2 border">View</div>

                    </div>
                    {
                        runningData.map((val, i) => {
                            return (
                                <div key={i} className='row ' style={{ color: val.amount > 0 ? "blue" : "red" }}>
                                    {
                                        val.name === user ? "" : val.amount === 0 ? "" :
                                            <>
                                                <div className="col-5 border padingAdjustment">{val.name}</div>
                                                <div className="col-3 border">{val.amount}</div>
                                                <div className="col-2 border">{val.amount > 0 ? "Take" : "Give"}</div>
                                                <div className="col-2 border" onClick={(e) => handleIndividual(val.name, val.amount, val.username)} style={{cursor:"pointer"}}>Click</div>

                                            </>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
