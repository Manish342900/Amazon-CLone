import React, { useEffect, useState } from 'react';
import { useDelivery } from './delivery';
import { useCart } from '../cart';
import "./checkout.css"

export default function Dates({ carItem }) {
    const { delivery } = useDelivery();
    const [clicked, setClicked] = useState(0);
    const { cartItems, updateCart } = useCart()

    const getCurrentDate = (increaseTime) => {
        const currentDate = new Date();
        let cur=`${currentDate.getDate()+increaseTime.time }`
        console.log(cur)



        return `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${cur}`;
    };

    const handleRadioChange = (index, value) => {
        setClicked(index);
        updateCart((prev) => prev.map((item) => item.value.id === value ? { ...item, deliveryOption: index } : item))
    };



    return (
        <>
            {delivery && delivery.length > 0 ? (
                delivery.map((date, index) => (
                    <div key={date.id} className="delivery-option">
                        <input
                            type="radio"
                            checked={index === carItem.deliveryOption}
                            className="delivery-option-input"
                            name={carItem.value.id}
                            onChange={() => handleRadioChange(index, carItem.value.id)}
                        />
                        <div>
                            <div className="delivery-option-date">
                                {getCurrentDate(date)}
                            </div>
                            <div className="delivery-option-price">
                                {`$${(date.priceCents / 100).toFixed(2)} Shipping`}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div>No delivery options available.</div>
            )}
        </>
    );
}
