import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDataGive, setDataTake, setName, setAmount } from '../Redux/features/DataSlice';

export default function Lend() {
    const [runningData, setRunningData] = useState([]);
    const [user, setUser] = useState("Anshu");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dataGive = [
        {
            Payer: "Anshu",
            Payee: "Aakash",
            Price: 500,
            Date: 12 + "sun",
            Time: "12:12",
            Description: "fooding",
            Status: "pen"

        },
        {
            Payer: "Anshu",
            Payee: "Abhay",
            Price: 500,
            Date: 12 + "sun",
            Time: "12:12",
            Description: "fooding",
            Status: "pen"

        },
        {
            Payer: "Anshu",
            Payee: "Soum",
            Price: 500,
            Date: 12 + "sun",
            Time: "12:12",
            Description: "fooding",
            Status: "pen"

        },
        {
            Payer: "Anshu",
            Payee: "Jindal",
            Price: 500,
            Date: 12 + "sun",
            Time: "12:12",
            Description: "fooding",
            Status: "pen"

        }
    ];
    const dataTake = [
        {
            Payer: "Aakash",
            Payee: "Anshu",
            Price: 500,
            Date: 12 + "sun",
            Time: "12:12",
            Description: "fooding",
            Status: "pen"

        },
        {
            Payer: "Abhay",
            Payee: "Anshu",
            Price: 700,
            Date: 12 + "sun",
            Time: "12:12",
            Description: "fooding",
            Status: "pen"

        },
        {
            Payer: "Soum",
            Payee: "Anshu",
            Price: 300,
            Date: 12 + "sun",
            Time: "12:12",
            Description: "fooding",
            Status: "pen"

        },
        {
            Payer: "Jindal",
            Payee: "Anshu",
            Price: 900,
            Date: 12 + "sun",
            Time: "12:12",
            Description: "fooding",
            Status: "pen"

        }
    ];
    const members = ["Aakash", "Anshu", "Abhay", "Soum", "Jindal", "Riya"];
    const finalCalculation = () => {
        const arr = [];
        members.forEach((val) => {
            arr.push({ name: val, amount: 0 });
        })
        // console.log(arr);
        arr.forEach((mem) => {
            dataGive.forEach((val) => {
                if (mem.name !== user && val.Payee === mem.name) mem.amount = mem.amount + val.Price;
            });
        });
        // console.log(arr);
        arr.forEach((mem) => {
            dataTake.forEach((val) => {
                if (mem.name !== user && val.Payer === mem.name) mem.amount = mem.amount - val.Price;
            });
        });
        setRunningData(arr);
    }
    const handleIndividual = (v_name,amount) => {
        // setUser(e.target.value);
        console.log(v_name);
        dispatch(setDataGive(dataGive));
        dispatch(setDataTake(dataTake));
        dispatch(setName(v_name));
        dispatch(setAmount(amount));
        navigate('/lend/individual');
    }
    useEffect(() => {
        finalCalculation();
        // dispatch(setDataGive(dataGive));
        // dispatch(setDataTake(dataTake));
        // dispatch(setName(user));
    }, [])
    return (
        <div className='container'>
            <div className="container">
                <div className="container border border-info mt-3">
                    <h2 className='text-center'>{user}</h2>
                    <div className='row pt-1 pb-1 font-weight-bold border'>
                        <div className="col-5">Payee</div>
                        <div className="col-3">Total 💵</div>
                        <div className="col-2">Status</div>
                        <div className="col-2">View</div>

                    </div>
                    {
                        runningData.map((val, i) => {
                            return (
                                <div key={i} className='row ' style={{ color: val.amount > 0 ? "blue" : "red" }}>
                                    {
                                        val.name === user ? "" : val.amount === 0 ? "" :
                                            <>
                                                <div className="col-5 border">{val.name}</div>
                                                <div className="col-3 border">{val.amount}</div>
                                                <div className="col-2 border">{val.amount > 0 ? "Take" : "Give"}</div>                                               
                                                <div className="col-2 border" onClick={(e) => handleIndividual(val.name,val.amount)}>Click</div>
                                               
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
