import React from 'react'
import { handleError, handleSuccess } from './toast';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

export default function Contact(props) {
    const [contactDetails, setContactDetails] = React.useState({
        name: '',
        email: '',
        description: ''
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!contactDetails.name || !contactDetails.email || !contactDetails.description) {
            console.log(contactDetails);
            handleError('Please fill all the fields');
            return;
        }
        await axios.post('https://pay-turn-app-api.vercel.app/contactUs/contactUs', contactDetails)
            .then(res => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                handleSuccess('Thank you for contacting us. We will get back to you ASAP!');
                setContactDetails({
                    name: '',
                    email: '',
                    description: ''
                });
                setTimeout(() => {
                    props.setDisplayContact(false);
                }, 2000);
            })
            .catch(err => {
                handleError('Some Error Occured');
            });
        // console.log(contactDetails);
    }
    const handleChange = (e) => {
        setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });
    }
    return (
        <>
            <div className='container myborder mt-3 footerContainer'>
                <div className='contactHead'>Contact us</div>
                <div className='contactDesc'> We will get back to you ASAP!</div>
                <div>
                    <label htmlFor="" className='contactName'>Name: </label>
                    <input type="text" name='name' onChange={handleChange} placeholder='Your name'value={contactDetails.name} />
                </div>
                <div>
                    <label htmlFor="" className='contactName'>Email:</label>
                    <input type="email" name='email' onChange={handleChange} placeholder='Your E-mail' value={contactDetails.email}/>
                </div>
                <div>
                    <label htmlFor="" className=''>Description: </label> <br />
                    <textarea name="description" id="" cols="50" rows="5" onChange={handleChange} placeholder='Type Your message here' value={contactDetails.description}></textarea>
                </div>
                <div style={{ textAlign: "center" }}>
                    <button className='btn btn-info ' onClick={handleSubmit}>Submit</button>
                    <button className='btn btn-info' style={{ marginLeft: '4rem' }} onClick={() => props.setDisplayContact(false)}>Hide</button>
                </div>
                <ToastContainer/>
            </div>

        </>
    )
}
