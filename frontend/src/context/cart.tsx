import React, { createContext, useState } from "react";

export const CartInFo = createContext(null);
const CartProvider = ({ children }: unknown) => {
  const [cartData, setCartData] = useState([]);
 
//   console.log(children)

  return (
    <CartInFo.Provider
      value={{ cartData, setCartData }}
    >
      {children}
    </CartInFo.Provider>
  );
};
export default CartProvider;
