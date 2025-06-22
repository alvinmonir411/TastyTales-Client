import React, { createContext, useState, useContext } from "react";

// 1️⃣ Create the context
export const CardContext = createContext();

// 2️⃣ Create the provider
export const CardProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [cardData, setCardData] = useState([]);

  const cardInfo = {
    count,
    setCount,
    cardData,
    setCardData
  };

  return (
    <CardContext.Provider value={cardInfo}>{children}</CardContext.Provider>
  );
};

