import React, { createContext, useState, useContext, useEffect } from 'react';


const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity,setQuantity]=useState(0)
  const [finalOrder,setFinalOrder]=useState()
  

  const updateCart = (newItems) => {
    setCartItems(newItems);
  };

  useEffect(()=>{
    let quant=0;
    cartItems.forEach((element) => {
      quant+=element.quantity
    });
    setQuantity(quant)

  },[cartItems])

  

  return (
    <CartContext.Provider value={{ cartItems, updateCart,quantity,setFinalOrder,finalOrder }}>
      {children}
    </CartContext.Provider>
  );
};


export  const useCart = () => useContext(CartContext);
