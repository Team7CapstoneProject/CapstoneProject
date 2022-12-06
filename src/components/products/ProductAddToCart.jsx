import React from "react";
import { addProductToCart, createCart } from "../../api";

const ProductAddToCart = ({
  token,
  userAccount,
  product,
  cartProducts,
  setCartProducts,
  cart,
  setCart,
}) => {
  async function handleAddToCart(event) {
    event.preventDefault();

    if (cart === undefined || cart.is_complete===true) {
      let newCart = await createCart(token, userAccount.id);
      if (!newCart.error) {
        setCart(newCart);
      }
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

      // let cartProductList = ProductAdded[0].products;

      // let productArray = [];
      // cartProductList.forEach((product) => {
      //   if (product.id === referenceProductId) {
      //     productArray.push(product);
      //   }
      // });

      if (!ProductAdded.error) {
        console.log(ProductAdded, "SUCCESSSS");
        //need to set updated cartproduct here

        // setCartProducts([...cartProducts, productArray[0]]);

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
