import React, { useEffect, useState } from "react";
import {
  deleteCartProduct,
  updateCartProductQuantity,
  getCartByUserId,
  createCart,
  updateCartCompletion,
} from "../../api";
import "./CSS/cart.css";
import { Link, useParams } from "react-router-dom";

const Cart = ({ token, userAccount, cart, setCart, setNavGreeting }) => {
  const [quantity, setQuantity] = useState(1);

  async function increment(cartProductId, quantity) {
    try {
      const newestQuantity = quantity + 1;
      const updateQuantity = await updateCartProductQuantity(
        token,
        cartProductId,
        newestQuantity
      );

      const newCart = JSON.parse(JSON.stringify(cart));
      newCart.products.forEach((e) => {
        if (e.id === cartProductId) {
          e.quantity = newestQuantity;
        }
      });
      setCart(newCart);
    } catch (error) {
      throw error;
    }
  }

  async function decrement(cartProductId, quantity) {
    try {
      let newestQuantity = quantity;
      if (newestQuantity === 0) {
        return;
      } else {
        newestQuantity = quantity - 1;
      }

      const updateQuantity = await updateCartProductQuantity(
        token,
        cartProductId,
        newestQuantity
      );
      const newCart = JSON.parse(JSON.stringify(cart));
      newCart.products.forEach((e) => {
        if (e.id === cartProductId) {
          e.quantity = newestQuantity;
        }
      });
      setCart(newCart);
    } catch (error) {
      throw error;
    }
  }

  async function handleDelete(e) {
    try {
      e.preventDefault();
      const toDelete = e.target.id;
      const deletedItem = await deleteCartProduct(token, toDelete);

      if (!deletedItem.error) {
        let updatedCart = await getCartByUserId(token);
        updatedCart = updatedCart.filter((cart) => cart.is_complete === false);
        setCart(updatedCart[0]);
        setNavGreeting("Item removed from cart!")
      }
    } catch (error) {
      throw error;
    }
  }

  async function checkout(event) {
    event.preventDefault();

    if (cart && cart.products) {
      let completedCart = await updateCartCompletion(token, cart.id);

      if (!completedCart.error) {
        let userCart = await getCartByUserId(token);
        userCart = userCart.filter((_cart) => _cart.id === cart.id);
        if (userCart[0].is_complete === true) {
          let newCart = await createCart(token, userAccount.id);
          if (!newCart.error) {
            setCart(newCart);
            setNavGreeting("Your cart is checked out!");
          } else {
            setNavGreeting(newCart.message);
          }
        }
      } else {
        setNavGreeting("Your order is failed to complete");
      }
    } else {
      setNavGreeting("Your cart is empty!");
    }
  }

  //---------Functions for checking total price of combined products----------
  //-----Declare state for subtotal changes. The useEffect renders the whole thing on load and refreshes every time cart changes (basically any time an item is added or subtracted from cart, the subtotal updates.
  const [subtotal, setSubtotal] = useState();
  useEffect(() => {
    if (cart) {
      let cartProducts = cart.products;
      let totalPrice;
      let finalPriceArray = [];
      let subTotal = 0;

      if (cartProducts) {
        cartProducts.forEach((product) => {
          if (product.on_sale === false) {
            totalPrice = product.quantity * Number(product.price);
            finalPriceArray.push(totalPrice);
          } else {
            let percentageConversion = product.sale_percentage * 0.01;
            let salePrice = product.price * (1 - percentageConversion);
            totalPrice = product.quantity * salePrice;
            finalPriceArray.push(totalPrice);
          }
        });
      }

      for (let i = 0; i < finalPriceArray.length; i++) {
        subTotal += finalPriceArray[i];
      }

      let finalTotal = Number(subTotal.toFixed(2));
      setSubtotal(finalTotal);
    }
  }, [cart]);

  return (
    <>
      <div>
        {cart ? (
          <div>
            <h2 className="cartHeader">Your shopping cart</h2>
            <div className="cartPageDiv">
              <div className="cartProductDiv">
                {cart.products ? (
                  cart.products.map((product) => {
                    return (
                      <div
                        key={`product-${product.id}`}
                        className="cartProduct"
                      >
                        <img
                          className="cartProductImage"
                          src={product.image_url}
                          alt={`${product.name} Image`}
                        />
                        <div>
                          <h3>{product.name}</h3>
                          <p>${product.price}</p>
                          {product.on_sale == true ? (
                            <div>
                              {" "}
                              <p>{product.sale_percentage}% off</p>
                              <p>
                                {`Discounted Price: $${(
                                  product.price *
                                  (1 - product.sale_percentage * 0.01)
                                ).toFixed(2)}`}
                              </p>
                            </div>
                          ) : null}
                          <p>
                            Quantity: {product.quantity}
                            <button
                              onClick={() => {
                                decrement(product.id, product.quantity);
                              }}
                              className="quantityButton"
                            >
                              -
                            </button>
                            <button
                              onClick={() => {
                                increment(product.id, product.quantity);
                              }}
                              className="quantityButton"
                            >
                              +
                            </button>
                          </p>

                          <p
                            onClick={handleDelete}
                            id={
                              product.cartProductId
                                ? `${product.cartProductId}`
                                : null
                            }
                            className="remove"
                          >
                            Remove from cart
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>
                    <p>Your cart is currently empty.</p>
                    <Link to={"/products"}>
                      {" "}
                      <button className="emptyCartButton">
                        Add products to cart!
                      </button>{" "}
                    </Link>
                  </div>
                )}
              </div>
              <div className="checkoutDiv">
                <div className="subtotal"> {`Total: $${subtotal}`}</div>
                {/* <Link to={"/checkout"}>
                <button className="checkoutButton">
                  Continue to checkout
                </button>
                </Link> */}
                <button className="checkoutButton" onClick={checkout}>
                  Continue to checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>Your cart is empty!</div>
        )}
      </div>
    </>
  );
};
export default Cart;
