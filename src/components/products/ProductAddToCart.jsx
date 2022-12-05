import React from "react";
import { addProductToCart } from "../../api";

const ProductAddToCart = ({ product, cart, setCart }) => {
console.log(cart)
  async function handleAddToCart(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      const cart_id = cart.id;

      const product_id = product.id;
      // const quantity = cart.products.map((product)=>{
      // if(product.id == product.id){
      //   return product.quantity
      // }})
      const quantity = 1
      // REMOVE HARD CODE LATER^
  
      const ProductAdded = await addProductToCart(
        token,
        cart_id,
        product_id,
        quantity
      );
      if (ProductAdded) {
        console.log(ProductAdded, "SUCCESSSS");
      }
    } else {
      setCart([...cart, product])
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
