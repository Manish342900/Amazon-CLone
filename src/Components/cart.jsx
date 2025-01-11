import React, { createContext, useState, useContext, useEffect } from 'react';


const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity,setQuantity]=useState(0)
  const [finalOrder,setFinalOrder]=useState()
  const [total,setTotal]=useState(0)

  

  const updateCart = (newItems) => {
    setCartItems(newItems);
  };

  function updateFinalOrder (newItems,value) {
    setTotal(value)
    
    setFinalOrder(newItems);
  };

  useEffect(()=>{
    let quant=0;
    cartItems.forEach((element) => {
      quant+=element.quantity
    });
    setQuantity(quant)

  },[cartItems])

  

  return (
    <CartContext.Provider value={{ cartItems, updateCart,quantity,updateFinalOrder,finalOrder,total }}>
      {children}
    </CartContext.Provider>
  );
};


export  const useCart = () => useContext(CartContext);
