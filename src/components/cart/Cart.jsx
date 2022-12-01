import React, { useState } from "react";
import { updateCartProductQuantity } from "../../api";
import { Link } from "react-router-dom";

const Cart = ({ cart, setCart }) => {
  const [quantity, setQuantity] = useState();

async function increment(cartProductId, quantity){
try {
  const token = localStorage.getItem("token")
  const updateQuantity = await updateCartProductQuantity(
    token,
    cartProductId,
    quantity)
    JSON.parse(JSON.stringify(cart));
    const newQuantity = updateQuantity + 1
    setQuantity(newQuantity)
} catch (error) {
  throw error;
}
}

async function decrement(cartProductId, quantity){
  //make a patch request to db to update cart item
  //change quantity
  //quantity - 1
  //make a copy of cart
  //JSON.parse(JSON.stringify(object_to_copy))
  //decrease quantity here by 1
  //reset the state
try {
  const token = localStorage.getItem("token")
  const updateQuantity = await updateCartProductQuantity(
    token,
    cartProductId,
    quantity)
    JSON.parse(JSON.stringify(cart));
    const newQuantity = updateQuantity - 1
    setQuantity(newQuantity)
} catch (error) {
  throw error;
}
}
  console.log(cart);
  return (
    <>
      <h2>cart:</h2>
      <div>
        {cart.products ? (
          cart.products.map((product) => {
            console.log(product, "THIS IS PRODUCT 35")
            return (
              <div key={`product-${product.id}`}>
                <h3>{product.name}</h3>
                <img
                  className="productImage"
                  src={product.image_url}
                  alt={`${product.name} Image`}
                />
                <p>${product.price}</p>
                <p>Quantity: 
                    {product.quantity}
                    <button onClick={()=>{
                      decrement(product.id, product.quantity)
                    }}>-</button>
                    <button onClick={()=>{
                      increment(product.id, product.quantity)
                    }}>+</button>
                </p>
                
                {product.on_sale == true ? (
                  <p>{product.sale_percentage}% off</p>
                ) : null}
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
      <div>
        <div className="subtotal"></div>
        <Link to={"/checkout"}>
          <button>Checkout Here!</button>
        </Link>
      </div>
    </>
  );
};
export default Cart;
