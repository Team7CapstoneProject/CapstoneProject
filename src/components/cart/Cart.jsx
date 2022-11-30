import React from "react";
const Cart = (props) => {
  const { cart, setCart } = props;

  console.log(cart, "HERE");
  return (
    <>
      <div>This is Cart Component</div>
    </>
  );
};
export default Cart;
