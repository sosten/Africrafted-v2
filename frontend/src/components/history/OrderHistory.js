import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import axios from 'axios';

const OrderHistory = () => {
    const state = useContext(GlobalState);
    const [history, setHistory] = state.userAPI.history;
    const [isAdmin]  = state.userAPI.isAdmin;
    const [token] = state.token;

    useEffect(()=>{
        if(token){
          const getHistory = async () => {
            if(isAdmin){
                const res = await axios.get('/api/payment', {
                  headers: {Authorization: token}
              })
              setHistory(res.data)
            }else{
              const res = await axios.get('/api/history', { //for user change api to user
                headers: {Authorization: token}
            })
            setHistory(res.data)
            }
            
          }
          getHistory();
        }
      }, [token, isAdmin, setHistory])

  return (
    <div className="history_page">
        <h2>History</h2>

        <h4>You have {history.length} ordered</h4>
        <table>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Date of Purchase</th>
              <th></th>
            </tr>
            <tbody>
              {
                history.map((items)=>(
                  <tr key={items._id}>
                    <td>{items.paymentID}</td>
                    <td>{new Date(items.createAt).toLocaleDateString()}</td>
                    <td><Link to={`/history/${items._id}`}>View</Link></td>
                  </tr>
                ))
              }
            </tbody>
        </thead>
      </table>
    </div>
  )
}

export default OrderHistory;