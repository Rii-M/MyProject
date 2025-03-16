import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const PlaceOrder = () => {
  // const navigate = useNavigate()
  const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext)
  
  //to store info from form field and initialzed with object where we have properties like fname lname and all
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    // state:"",
    // zipcode:"",
    // country:"",
    phone:""
  })

  //onchange handler to save input field data in state variable
  const onChangeHandler =(event)=>{ //using parameter event we will extract name and value
    const name =event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  //arrow function to redirect to payment gateway
  const placeOrder = async(event)=>{ //small p here and is linked to proceed to payment
    event.preventDefault();
    //structure data as in api
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"]=cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    console.log(orderItems);
    
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    // navigate ("/")
    //send orderData to api
    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    
      if (response.data.success && response.data.session_url) {
        console.log("Redirecting to:", response.data.session_url);
        window.location.href = response.data.session_url; // Redirecting to success URL
      } else {
        console.log("Error in response:", response.data);
        alert("Payment could not be processed.Please login");
        window.location.href = `http://localhost:5173/verify?success=false&orderId=${response.data.orderId || ''}`;
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred. Redirecting to order verification...");
      window.location.href = `http://localhost:5173/verify?success=false&orderId=`;
    }
    
  }

  //after myorder so that it won't be visble when logged in
  const navigate = useNavigate();
  useEffect(()=>{
    if (!token) {
      navigate('/cart')
      alert('Please Login')
    }
    else if(getTotalCartAmount()==0)
    {
      navigate('/cart ')
      alert("No items in the cart. Add to cart")
    }
  },[token])
 
  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className='place-order-left'>
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName}  type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name'/>
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          {/* <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/> */}
        </div>
        <div className="multi-fields">
          {/* <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' /> */}
          {/* <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/> */}
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="integer" placeholder='Phone' />
      </div>

      <div className='place-order-right'>
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>Rs.{getTotalCartAmount()===0?"0":"2"}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>Rs.{getTotalCartAmount()===0?"0":getTotalCartAmount()+2}</p>
            </div>
          </div>
          <button type='submit'>PROCEED TO Payment</button>
        </div>

      </div>

    </form>
  )
}

export default PlaceOrder;

