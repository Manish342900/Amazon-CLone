import React from 'react'
import Logo from "../../images/amazon-logo.png"
import LogoMobile from "../../images/amazon-mobile-logo-white.png"
import CheckOutLock from "../../images/icons/checkout-lock-icon.png"
import { Link } from 'react-router-dom'
import { useCart } from '../cart'

export default function CheckOutHeader() {
  const{quantity}=useCart()
  
  return (
    
      <div className="checkout-header">
            <div className="header-content">
              <div className="checkout-header-left-section">
                <Link to="/">
                  <img className="amazon-logo" src={Logo} alt="Amazon Logo" />
                  <img className="amazon-mobile-logo" src={LogoMobile} alt="Amazon Mobile Logo" />
                </Link>
              </div>

              <div className="checkout-header-middle-section">
                Checkout (<a className="return-to-home-link" href="amazon.html">{quantity}</a>
                <small style={{ color: 'rgb(25, 96, 96)' }}>Items</small>)
              </div>

              <div className="checkout-header-right-section">
                <img src={CheckOutLock} alt="Checkout Lock Icon" />
              </div>
            </div>
          </div>
    
  )
}
