import React, { useEffect, useState } from "react";
import { addProductToCart } from "../../api";

const ProductAddToCart = ({ product, cart, setCart }) => {
  const [addCart, setAddCart] = useState(cart);

  useEffect(() => {});

  //take the product id and set it in the cart

  async function handleAddToCart(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token);
    const cart_id = cart.id;

    console.log(cart);
    console.log(product, "PRoD");
    const product_id = product.id;
    const quantity = 1;
    // REMOVE HARD CODE LATER^

    const ProductAdded = await addProductToCart(
      token,
      cart_id,
      product_id,
      quantity
    );
    if (ProductAdded) {
      console.log("SUCCESSSS");
    }
  }

  return (
    <>
      <button onClick={handleAddToCart} className="buttonAddToCart">
        Add to Cart
      </button>
    </>
  );
};
export default ProductAddToCart;
