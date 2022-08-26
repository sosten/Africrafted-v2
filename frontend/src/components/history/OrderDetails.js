import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';

const OrderDetails = () => {
    const state = useContext(GlobalState);
    const [history] = state.userAPI.history;
    const [orderDetails, setOrderDetails] = useState([]);

    const params = useParams();

    useEffect(()=>{
        if(params.id){
            history.forEach(item => {
                if(item._id === params.id) setOrderDetails(item)
            });
        }
    }, [params.id, history])

    if(orderDetails.length === 0) return null;

  return (
    <div className='history_page'>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Postal Code</th>
                    <th>Country Code</th>
                </tr>
                <tbody>
                   <tr>
                        <td>{orderDetails.address.recipient_name}</td>
                        <td>{orderDetails.address.line1 + " - " + orderDetails.address.city}</td>
                        <td>{orderDetails.address.postal_code}</td>
                        <td>{orderDetails.address.country_code}</td>
                   </tr>
                </tbody>
            </thead>
        </table>

        <table style={{margin: "30px 0px"}}>
            <thead>
                <tr>
                    <th></th>
                    <th>Products</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
                <tbody>
                   {
                    orderDetails.toLocaleString.map(item => (
                        <tr key={item._id}>
                            <td><img src={item.images.url} alt="" /></td>
                            <td>{item.title}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price + item.quantity}</td>
                        </tr>
                    ))
                   }
                </tbody>
            </thead>
        </table>
    </div>
  )
}

export default OrderDetails;