import React, { useEffect } from 'react'
import "./checkout.css"
import Dates from './Dates'

export default function OrderSummary({ cartItems = [],update }) {

    function handleDelete(Item){
        const newCartItem=cartItems.filter((cartItem)=>cartItem.value.id !== Item.value.id)
        update(newCartItem)

    }
    

    return (
        <>
            {
                cartItems && cartItems.length ?

                    cartItems.map((cartItem) =>
                        <>
                            <div className={`cart-item-container `}>
                                <div className="delivery-date">
                                    Delivery date:
                                </div>

                                <div className="cart-item-details-grid">
                                    <img className="product-image"
                                        src={cartItem.value.images}
                                        alt={cartItem.value.title} />

                                    <div className="cart-item-details">
                                        <div className="product-name">
                                            {cartItem.value.title}
                                        </div>
                                        <div className="product-price">
                                            {`$ ${cartItem.value.price}`}
                                        </div>
                                        <div className="product-quantity">
                                            <span>
                                                Quantity: {cartItem.quantity}
                                            </span>

                                            <span onClick={()=>handleDelete(cartItem)} className="delete-quantity-link link-primary" >
                                                Delete
                                            </span>
                                        </div>
                                    </div>

                                    <div className="delivery-options">
                                        <div className="delivery-options-title">
                                            Choose a delivery option:
                                            <Dates carItem={cartItem}/>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </>
                    )



                    : <div>No Item In the Cart</div>
            }
        </>
    )
}







