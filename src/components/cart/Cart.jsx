import React, { useState } from "react";
import { deleteCartProduct, updateCartProductQuantity } from "../../api";
import "./CSS/cart.css";
import { Link, useParams } from "react-router-dom";

const Cart = ({ cart, setCart }) => {
  const [quantity, setQuantity] = useState(1);

  async function increment(cartProductId, quantity) {
    try {
      const token = localStorage.getItem("token");
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
      console.log(newCart, "NEWCART");
      setCart(newCart);
    } catch (error) {
      throw error;
    }
  }

  async function decrement(cartProductId, quantity) {
    try {
      const token = localStorage.getItem("token");
      const newestQuantity = quantity - 1;
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
      // const { cartProductId } = useParams();
      const toDelete = e.target.id;
      console.log(toDelete);
      const token = localStorage.getItem("token");
      const deleted = await deleteCartProduct(token, toDelete);
    } catch (error) {
      throw error;
    }
  }

  console.log(cart);
  return (
    <>
      <h2 className="cartHeader">Your shopping cart</h2>
      <div className="cartPageDiv">
        <div className="cartProductDiv">
          {cart.products ? (
            cart.products.map((product) => {
              // console.log(product, "THIS IS PRODUCT 35");
              return (
                <div key={`product-${product.id}`} className="cartProduct">
                  <img
                    className="productImage"
                    src={product.image_url}
                    alt={`${product.name} Image`}
                  />
                  <div>
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                    {product.on_sale == true ? (
                      <p>{product.sale_percentage}% off</p>
                    ) : null}
                    <p>
                      Quantity:
                      {product.quantity}
                      <button
                        onClick={() => {
                          decrement(product.id, product.quantity);
                        }}
                      >
                        -
                      </button>
                      <button
                        onClick={() => {
                          increment(product.id, product.quantity);
                        }}
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
              <Link to={"/products"}>
                {" "}
                <button>add products to cart!</button>{" "}
              </Link>
            </div>
          )}
        </div>
        <div className="checkoutDiv">
          <div className="subtotal"> Total: $</div>
          <Link to={"/checkout"}>
            <button className="checkoutButton">Continue to checkout</button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Cart;
