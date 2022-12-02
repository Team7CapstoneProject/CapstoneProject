import React, { useEffect, useState } from "react";
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
      const token = localStorage.getItem("token");
      const deleted = await deleteCartProduct(token, toDelete);
    } catch (error) {
      throw error;
    }
  }

  const [subtotal, setSubtotal]=useState()
  useEffect(() => {
    //---------Functions for checking total price of combined products----------
    //-----Declare state for subtotal
    let cartProducts = cart.products;

    //-----Isolate products that are not on sale and place in its own array
    let productsNotOnSale = cartProducts.filter(
      (product) => product.on_sale === false
    );

    //-----Take each product in the productsNotOnSale array and multiply the price by quantity in cart.
    let productNotOnSalePriceArray = [];
    productsNotOnSale.forEach((product) => {
      let totalPrice = product.quantity * Number(product.price);
      productNotOnSalePriceArray.push(totalPrice);
    });

    //-----Isolate products that are on sale and place in its own array
    let productsOnSale = cartProducts.filter(
      (product) => product.on_sale === true
    );
    //-----Take each product in the productsOnSale array and multiply the price (taking sale into account) by quantity in cart.
    let productOnSalePriceArray = [];
    productsOnSale.forEach((product) => {
      let salePrice;
      let finalSalePrice;
      let percentageConversion = product.sale_percentage * 0.01;
      salePrice = product.price * (1 - percentageConversion);
      finalSalePrice = Number(salePrice.toFixed(2));
      let totalPrice = product.quantity * finalSalePrice;
      productOnSalePriceArray.push(totalPrice);
    });

    //-----Merge both on sale and not on sale price arrays so that the price values are in one array
    let mergedPriceArrays = [
      ...productNotOnSalePriceArray,
      ...productOnSalePriceArray,
    ];

    //-----Sum all values in the array to get subtotal
    let subTotal = 0;
    for (let i = 0; i < mergedPriceArrays.length; i++) {
      subTotal += mergedPriceArrays[i];
    }

    setSubtotal(subTotal)
  }, [cart]);

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
          <div className="subtotal"> {`Total: $${subtotal}`}</div>
          <Link to={"/checkout"}>
            <button className="checkoutButton">Continue to checkout</button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Cart;
