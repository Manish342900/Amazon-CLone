import React, { createContext, useState, useContext, useEffect } from 'react';


const InputContext = createContext();


export const InputProvider = ({ children }) => {
    const [input,setInputValue]=useState('')
  

  

  const updateInput = (newItems) => {
    setInputValue(newItems.toLowerCase());
  };

  return (
    <InputContext.Provider value={{ input, updateInput}}>
      {children}
    </InputContext.Provider>
  );
};


export  const useInput = () => useContext(InputContext);
