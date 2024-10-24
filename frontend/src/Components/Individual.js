import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function Individual() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch();
  const [combinedData, setCombinedData] = useState([]);
  const dataGive = useSelector((state) => state.data.dataGive);
  const dataTake = useSelector((state) => state.data.dataTake);
  const name = useSelector((state) => state.data.name);
  const user = useSelector((state) => state.data.user);
  const final = useSelector((state) => state.data.amount);
  function test() {
    console.log(dataGive);
    console.log(dataTake);
    console.log(name);
  }
  useEffect(() => {
    let filterData = [...dataGive, ...dataTake];
    filterData = filterData.filter((val) => {
      if (val.Payee === name && val.Payer === user) return true;
      else if (val.Payer === name && val.Payee === user) return true;
      else return false;
    });
    console.log(filterData);
    setCombinedData(filterData);
    // const com = [...dataGive, ...dataTake];
    // setCombinedData(com);
    // console.log(combinedData);
    // const sortedData = com.sort((a, b) => {
    //   if (b.date === a.date) return b.time - a.time;
    //   return b.date - a.date;
    // });
    // setCombinedData(sortedData);
  }, [name]);
  return (
    <div>
      <div className='container'>
        <div className="container">
          <div className="container border border-info mt-3">
            <h2 className='text-center'>All Transactions</h2>
            <div>
              <div style={{ color: "red" }}>Took means: {name} gave to {user}</div>
              <div style={{ color: "blue" }}>Gave means: {user} gave to {name}</div>
              <div style={{ color: "green" }}>Final Standing : Rs {final}</div>
            </div>
            <div className='row pt-1 pb-1 font-weight-bold border'>
              <div className="col-2 border">What</div>
              <div className="col-2 border">Rs </div>
              <div className="col-3 border">Reason</div>
              <div className="col-3 border">Date</div>
              <div className="col-2 border">Time</div>

            </div>
            {
              combinedData.map((val, i) => {
                return (
                  <div key={i} className='row ' style={{ color: val.Payer === user ? "blue" : "red" }}>
                    {
                      <>
                        <div className="col-2 border">{val.Payer === name ? "Take" : "Give"}</div>
                        <div className="col-2 border">{val.Price}</div>
                        <div className="col-3 border">{val.Description}</div>
                        <div className="col-3 border">{val.Date}</div>
                        <div className="col-2 border">{val.Time}</div>
                      </>
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}