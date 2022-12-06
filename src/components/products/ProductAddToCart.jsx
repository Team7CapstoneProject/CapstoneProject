import React from "react";
import { addProductToCart, createCart, getCartByUserId } from "../../api";

const ProductAddToCart = ({
  token,
  userAccount,
  product,
  cart,
  setCart,
  setNavGreeting
}) => {
  async function handleAddToCart(event) {
    event.preventDefault();

    if (cart === undefined || cart.is_complete === true) {
      let newCart = await createCart(token, userAccount.id);
      if (!newCart.error) {
        setCart(newCart);
      }
    }

    if (product.inventory === 0) {
      return;
    }

    if (token && cart) {
      const cart_id = cart.id;
      const referenceProductId = product.id;
      const quantity = 1;

      const ProductAdded = await addProductToCart(
        token,
        cart_id,
        referenceProductId,
        quantity
      );

      if (!ProductAdded.error) {
        let updatedCart = await getCartByUserId(token);
        updatedCart = updatedCart.filter((cart) => cart.is_complete === false);
        setCart(updatedCart[0]);
        setNavGreeting(`Item added to cart!`)
      } else {
        setNavGreeting(`Item is already in cart!`);
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
