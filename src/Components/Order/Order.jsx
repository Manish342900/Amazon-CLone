import React, { useEffect } from 'react';
import "./orders.css"

import { useCart } from '../cart';
import Orrder from './orrder';



export default function Order() {
  const { finalOrder,total } = useCart()
  const getCurrentDate = (increaseTime) => {
    const currentDate = new Date();
    return `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate() }`;
  };
  function generateID(time){
    const array=['1','2','3','4','5','6','7','8','9','0','A','B','C','D','E','f']
    let value=''
    let i=0
    while (i<=time){
      value+=array[Math.floor(Math.random()*17)]
      i++

    }
    return value
  }




  return (
    <div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>{getCurrentDate()}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>{total.toFixed(2)}</div>
          </div>
        </div>
        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>{generateID(10)}</div>
        </div>
      </div>
      <div class="order-details-grid">
        <Orrder cartItems={finalOrder}/>
      </div>
    </div>
  );
}
