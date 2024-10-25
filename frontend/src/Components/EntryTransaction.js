import React from 'react'
import { useSelector } from 'react-redux';

export default function EntryTransaction() {
    const members = ["Aakash", "Anshu", "Abhay", "Soum", "Jindal", "Riya"];
    const user = useSelector(state => state.data.user);
    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false }).slice(0, 5); // Format: HH:MM
    const [transaction, setTransaction] = React.useState({
        payer: user,
        payee: "",
        price: 0,
        date: currentDate,
        time: currentTime,
        description: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransaction(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(transaction);
    };

    return (
        <div className="container">
            <div className="container">
                <div className="container border mt-3">
                    <h2 className='mt-3'>Enter Transaction</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mt-2'>
                            <label htmlFor="payer">Payer: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input
                                type="text"
                                name="payer"
                                value={user}
                                onChange={handleChange}
                                placeholder="Payer"
                            />
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="payee">Payee: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <select name="payee" id="payee">
                                <option value="default">Select Payee</option>
                                {
                                    members.map((member, i) => (
                                        <option key={i} value={member.toLowerCase()}>{member}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div >
                            <label htmlFor="price">Amount: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input
                                type="number"
                                name="price"
                                value={transaction.price}
                                onChange={handleChange}
                                placeholder="Price"
                            />
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="date">Date: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input
                                type="date"
                                name="date"
                                value={transaction.date}
                                onChange={handleChange}
                                placeholder="Date"
                            />
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="time">Time:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input
                                type="time"
                                name="time"
                                value={transaction.time}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="description">Description: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input
                                type="text"
                                name="description"
                                value={transaction.description}
                                onChange={handleChange}
                                placeholder="Description"
                            />
                        </div>
                        <div className='mb-3 mt-2'>
                            <button className="btn btn-info" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
