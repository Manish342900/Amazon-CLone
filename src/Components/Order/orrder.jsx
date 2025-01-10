import React from 'react'

export default function Orrder({cartItems}) {
  return (
    <>
      {cartItems && cartItems.length ?
      cartItems.map((cartItem)=>
        <>
          <div className="product-image-container">
              <img src={cartItem.value.images}/>
            </div>

            <div className="product-details">
              <div className="product-name">
                {cartItem.value.title}
              </div>
              <div className="product-delivery-date">
                {`deliverydate`}
              </div>
              <div className="product-quantity">
                Quantity: {cartItem.quantity}
              </div>
              
            </div>
        </>
        
      )
      :<div>No items in the Cart</div>}
    </>
  )
}
