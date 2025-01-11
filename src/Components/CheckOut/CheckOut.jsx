import React, { useEffect, useState } from 'react';
import "./checkout-header.css"
import "./checkout.css"
import "./amazon-header.css"

import OrderSummary from './OrderSummary';
import CheckOutHeader from './checkOutHeader';
import PaymentSummar from './PaymentSummar';
import { useCart } from '../cart';


export default function CheckOut() {
 
  const { cartItems ,updateCart,quantity } = useCart()


  return (
    <div>
      <CheckOutHeader />
            <div className="maint">
              <div className="page-title">Review your order</div>
              <div className="checkout-grid">
                <div className="order-summary">
                  <OrderSummary cartItems={cartItems} update={updateCart} />
                </div>
                <div className="payment-summary">
                <PaymentSummar cartItems={cartItems} quantity={quantity} />
              </div>
              </div>
              
            </div>
    </div>
  );
}
