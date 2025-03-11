import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });

      if (response.data.success) {
        const { esewa_payment_url, formData } = response.data;

        // Create a form and auto-submit it to eSewa
        const form = document.createElement("form");
        form.method = "POST";
        form.action = esewa_payment_url;

        Object.keys(formData).forEach(key => {
          let input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = formData[key];
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } else {
        alert("Error occurred during order placement.");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred while placing the order.");
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className='place-order-left'>
        <p className="title">Delivery Information</p>
        <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
        <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' />
        <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
        <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
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
              <p>Rs.{getTotalCartAmount() === 0 ? "0" : "2"}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>Rs.{getTotalCartAmount() === 0 ? "0" : getTotalCartAmount() + 2}</p>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div></div>
    </form>
  );
};

export default PlaceOrder;
