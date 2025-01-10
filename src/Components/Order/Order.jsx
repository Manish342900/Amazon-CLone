import React, { useEffect } from 'react';
import "./orders.css"
import "./amazon-header.css"
import { useCart } from '../cart';
import Orrder from './orrder';



export default function Order() {
  const { finalOrder } = useCart()

  useEffect(()=>{
    console.log(finalOrder)
  },[finalOrder])

  return (
    <div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${`datestring`}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${`decimal(price())`}</div>
          </div>
        </div>
        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${`ID`}</div>
        </div>
      </div>
      <div class="order-details-grid">
        <Orrder cartItems={finalOrder}/>
      </div>
    </div>
  );
}
