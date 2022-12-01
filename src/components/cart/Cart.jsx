import React, { useState, useEffect } from "react";
import { getCartByUserId } from "../../api";

const Cart = (props) => {
  // const { cart, setCart } = props;

  let token = localStorage.getItem("token");
  const [myCart, setMyCart] = useState([]);
  useEffect(() => {
    async function fetchMyCart() {
      const myCartResponse = await getCartByUserId(token);

      setMyCart(myCartResponse);
    }
    fetchMyCart();
  }, []);

// console.log(myCart, "myCart")

  return (
    <>
      <div> This is Cart Component</div>
    </>
  );
};
export default Cart;
