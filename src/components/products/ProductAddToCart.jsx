import React from "react";
import { addProductToCart } from "../../api";

const ProductAddToCart = ({ product, cart, setCart }) => {
  async function handleAddToCart(event) {
    event.preventDefault();
    console.log("add to cart pressed")
    console.log(cart, "this is cart")


    const token = localStorage.getItem("token");
    if (token) {
      const cart_id = cart.id;
      const product_id = product.id;
      const quantity = 1;

      const ProductAdded = await addProductToCart(
        token,
        cart_id,
        product_id,
        quantity
      );
      console.log(ProductAdded, "this is product added")
      if (ProductAdded) {
        console.log(ProductAdded, "SUCCESSSS");
        //need to set updated cartproduct here
        // setCart([...cart,ProductAdded])
      }
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
