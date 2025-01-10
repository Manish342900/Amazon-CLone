import React, { createContext, useState, useContext, useEffect } from 'react';

const DeliveryContext = createContext();
   
export const DeliveryProvider = ({ children }) => {
    const  [delivery,setDelivery]=useState([
        {id:0,time:7,priceCents:0},
        {id:1,time:3,priceCents:499},
        {id:2,time:1,priceCents:999},
    ])
  

  return (
    <DeliveryContext.Provider value={{ delivery }}>
      {children}
    </DeliveryContext.Provider>
  );
};


export  const useDelivery = () => useContext(DeliveryContext);
