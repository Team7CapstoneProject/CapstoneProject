import React from "react";
import { addProductToCart } from "../../api";

const ProductAddToCart = ({ product, cartProducts, setCartProducts, cart }) => {
  async function handleAddToCart(event) {
    event.preventDefault();
    console.log("add to cart pressed");

    const token = localStorage.getItem("token");
    if (token) {
      const cart_id = cart.id;
      const referenceProductId = product.id;
      const quantity = 1;

      const ProductAdded = await addProductToCart(
        token,
        cart_id,
        referenceProductId,
        quantity
      );

      let cartProductList = ProductAdded[0].products;

      let productArray = [];
      cartProductList.forEach((product) => {
        if (product.id === referenceProductId) {
          productArray.push(product);
        }
      });

      if (!ProductAdded.error) {
        console.log(ProductAdded, "SUCCESSSS");
        //need to set updated cartproduct here
        console.log(cartProducts, "this is cart products before set")

      
        setCartProducts([...cartProducts, productArray[0]]);

        console.log(cartProducts, "this is cart products after set")
      } else {
        console.log(`${product.name} is already in cart!`);
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
