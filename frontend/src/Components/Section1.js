import React, { useEffect, useState } from 'react'

export default function Section1() {
    const [date, setDate] = useState();
    useEffect(()=>{
        let t = Date();
        t = t.slice(0,21);
        setDate(t);
        console.log(t);
        
    },[])
    return (
        <div className="container mt-2">
            <div className="container">
                <div className="container border border-info d-flex flex-column">
                    <div className='' >UserName : <span>User</span></div>
                    <div className=""> <span> Logged in at</span> <span>{date}</span></div>
                </div>
            </div>
        </div>
    )
}
