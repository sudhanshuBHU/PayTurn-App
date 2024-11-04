import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function Individual() {
  // const count = useSelector((state) => state.counter.value)
  const [combinedData, setCombinedData] = useState([]);
  const dataGive = useSelector((state) => state.data.dataGive);
  const dataTake = useSelector((state) => state.data.dataTake);
  const pname = useSelector((state) => state.data.name);
  const puser = useSelector((state) => state.data.user);
  const name = localStorage.getItem("payTurnName");
  const user = localStorage.getItem("payTurnUsername");
  const final = useSelector((state) => state.data.amount);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(dataGive, dataTake);

    let filterData = [...dataGive, ...dataTake];
    filterData = filterData.filter((val) => {
      if (val.payee_username === puser && val.payer_username === user) return true;
      else if (val.payer_username === puser && val.payee_username === user) return true;
      else return false;
    });
    // console.log(filterData);
    filterData.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    setCombinedData(filterData);

    // prevent the page from refreshing
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      // Custom logic to handle the refresh
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  const handleBack = () => {
    navigate('/dashboard');
  }

  return (
    <div>
      <div className='container mt-1'>
        <div className="container">
          <div className="container border border-info">
            <div className='text-right mt-1'>
              <button className='btn' onClick={handleBack}>Back</button>
            </div>
            <h2 className='text-center'>All Transactions</h2>
            <h4 style={{ color: final >= 0 ? "green" : "red" }}>Final Standing : Rs {final}</h4>
            <div className='adjustCellWrapper pt-1 pb-1 font-weight-bold border'>
              <div className=" border adjustCell">Status</div>
              <div className=" border adjustCell">Rs </div>
              <div className=" border adjustCell">Reason</div>
              <div className=" border adjustCell">Date</div>
              <div className=" border adjustCell">Time</div>
            </div>

            {/* <div className='adjustCellWrapper'>
              <div className="border cell">Credited</div>
              <div className="border cell">1000</div>
              <div className="border cell">fooding chicken</div>
              <div className="border cell">81-12-2024</div>
              <div className="border cell">12:12</div>
            </div> */}

            {
              combinedData.map((val, i) => {
                return (
                  <div key={i} className='' style={{ color: val.payer_username === user ? "red" : "blue" }}>
                    {
                      <div className='adjustCellWrapper'>
                        <div className="border cell">{val.payer_username === user ? "Debited" : "Credited"}</div>
                        <div className="border cell">{val.price}</div>
                        <div className="border cell">{val.description}</div>
                        <div className="border cell">{val.date}</div>
                        <div className="border cell">{val.time}</div>
                      </div>
                    }
                  </div>
                )
              })
            }
            <div className='infoIndividual'>
              <h4 className=''><u>Note:</u></h4>
              <div style={{ color: "blue" }}>Credited means: <span> {pname} </span>gave to <span> {name} </span></div>
              <div style={{ color: "red" }}>Debited means: <span > {name} </span> gave to <span > {pname} </span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}