import React from 'react'
import { handleError, handleSuccess } from './utils/toast';
import axios from 'axios';
import Spin from './utils/Spin';

export default function EntryTransaction(props) {
    // const members = ["Aakash", "Anshu", "Abhay", "Soum", "Jindal", "Riya"];
    const members = props.allUsers;
    const user = props.name;
    const payerUser = props.user;
    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false }).slice(0, 5); // Format: HH:MM
    const [transaction, setTransaction] = React.useState({
        payer: user,
        payer_username: payerUser,
        payee: "",
        payee_username: "",
        price: 0,
        date: currentDate,
        time: currentTime,
        description: ""
    });
    const [isLoading, setIsLoading] = React.useState(false);
    // console.log(transaction);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransaction(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (transaction.payee === "default" || transaction.payee === "") {
            handleError("Please select a payee.");
            return;
        }
        if (transaction.price <= 0) {
            handleError("Please enter a valid amount.");
            return;
        }
        if (transaction.description.length < 2) {
            transaction.description = "Not Given";
        }
        setIsLoading(true);
        await axios.post('https://pay-turn-app-api.vercel.app/addTransaction/newTransaction', transaction)
            .then(res => {
                handleSuccess("Transaction added successfully.");
                let tempDet = {
                    payee: transaction.payee,
                    payee_username: transaction.payee_username
                }
                setTransaction({
                    payer: user,
                    payer_username: payerUser,
                    payee: tempDet.payee,
                    payee_username: tempDet.payee_username,
                    price: 0,
                    date: currentDate,
                    time: currentTime,
                    description: ""
                });
            })
            .catch(err => {
                handleError(err.response.data.error);
            });
        setIsLoading(false);
        // console.log(transaction);
    };
    const handleSelect = (e) => {
        const { value } = e.target;
        const selectedMember = members.find(member => member.username === value);
        // console.log(value, selectedMember);
        setTransaction(prev => ({
            ...prev,
            payee: selectedMember.name,
            payee_username: selectedMember.username
        }));
    }

    return (
        <div className="container">
            <div className="container">
                <div className="container mt-3 entryWrapper">
                    {
                        isLoading && <Spin />
                    }
                    <h2 className='mt-3'>Enter Transaction</h2>
                    {/* <form onSubmit={handleSubmit}> */}
                    <div className='mt-2'>
                        <label htmlFor="payer">Payer: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input
                            type="text"
                            name="payer"
                            value={user}
                            onChange={handleChange}
                            placeholder={user}
                        />
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="payee">Payee: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <select name="payee" id="payee" onChange={handleSelect}>
                            <option value="default">Select Payee</option>
                            {
                                members.filter(m => m.username !== props.user).map((member, i) => (
                                    <option key={i} value={member.username}>{member.name} - {member.username}</option>
                                ))
                            }
                        </select>

                    </div>
                    <div >
                        <label htmlFor="price">Amount:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input
                            type="number"
                            name="price"
                            value={transaction.price}
                            onChange={handleChange}
                        // placeholder={transaction.price}
                        />
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="date">Date: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input
                            type="date"
                            name="date"
                            value={transaction.date}
                            onChange={handleChange}
                            placeholder="Date"
                        />
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="time">Time:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input
                            type="time"
                            name="time"
                            value={transaction.time}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="description">Description: &nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input
                            type="text"
                            name="description"
                            value={transaction.description}
                            onChange={handleChange}
                            placeholder="Description"
                        />
                    </div>
                    <div className='mb-3 mt-2'>
                        <button className="btn btn-info" onClick={handleSubmit}>Submit</button>
                    </div>
                    {/* </form> */}
                </div>
            </div>
        </div>
    );
}
