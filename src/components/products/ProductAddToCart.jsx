import React, { useEffect, useState } from "react";
import { addProductToCart } from "../../api";

const ProductAddToCart = ({product, cart, setCart}) => {
  const [addCart, setAddCart] = useState(cart);

  useEffect(()=>{

  })

//take the product id and set it in the cart

  async function handleAddToCart(event){
    const token = localStorage.getItem('token')
    console.log(token)
    const cart_id = cart.cart_id
    console.log(cart)
    event.preventDefault();
    //const ProductAdded = await addProductToCart(token, cart_id, product_id, quantity)

  }

  return (
    <>
    <button onClick={handleAddToCart} className="buttonAddToCart">Add to Cart</button>
    </>
  );
};
export default ProductAddToCart;