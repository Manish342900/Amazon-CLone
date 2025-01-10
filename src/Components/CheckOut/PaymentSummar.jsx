import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDelivery } from './delivery';
import { useCart } from '../cart';

export default function PaymentSummar({ }) {
  const [productPrice, setProductPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { delivery } = useDelivery(); 
  const {cartItems,updateCart,setFinalOrder,quantity,finalOrder} =useCart()

  function emptyCart(){
    setFinalOrder(cartItems)
 
    updateCart([])
  }

  useEffect(() => {
    let totalProductPrice = 0;
    let totalShipping = 0;

    // Calculate total product price
    cartItems.forEach((element) => {
      totalProductPrice += element.value.price * element.quantity;
    });

    // Calculate total shipping price
    cartItems.forEach((item) => {
    
      const deliveryOption = delivery.find(option => option.id == item.deliveryOption);
      console.log(deliveryOption)
      if (deliveryOption) {
        totalShipping += deliveryOption.priceCents /100; 
      }
    });

    
    const calculatedTax = totalProductPrice * 0.10;

    
    const calculatedTotalPrice = totalProductPrice + totalShipping + calculatedTax;

    
    setProductPrice(totalProductPrice);
    setShippingPrice(totalShipping);
    setTax(calculatedTax);
    setTotalPrice(calculatedTotalPrice);
    

  }, [cartItems, delivery]);

  useEffect(()=>console.log(finalOrder),[finalOrder])


  return (
    <div>
      <div className="payment-summary-title">Order Summary</div>

      <div className="payment-summary-row">
        <div>Items <span className="itemQuantity">{quantity}</span></div>
        <div className="payment-summary-money-1">${productPrice.toFixed(2)}</div>
      </div>

      <div className="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div className="payment-summary-money-2">${shippingPrice.toFixed(2)}</div>
      </div>

      <div className="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div className="payment-summary-money-3">${(productPrice + shippingPrice).toFixed(2)}</div>
      </div>

      <div className="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div className="payment-summary-money-4">${tax.toFixed(2)}</div>
      </div>

      <div className="payment-summary-row total-row">
        <div>Order total:</div>
        <div className="payment-summary-money-5">${totalPrice.toFixed(2)}</div>
      </div>

      <Link to="/order">
        <button onClick={()=>emptyCart()} className="place-order-button button-primary">
          Place your order
        </button>
      </Link>
    </div>
  );
}
