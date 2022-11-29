import React from "react";
const Cart = (props) => {
  const { cart, setCart } = props;
  const { userCart, setUserCart } = props;

  setCart(userCart);
  console.log(userCart, "HERE");
  return (
    <>
      <div>This is Cart Component</div>
    </>
  );
};
export default Cart;
