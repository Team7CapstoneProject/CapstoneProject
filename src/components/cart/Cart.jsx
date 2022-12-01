import React, { useState, useEffect } from "react";
import { getCartByUserId, updateCartProductQuantity } from "../../api";
import { Link } from "react-router-dom";

const Cart = ({ cart, setCart }) => {
  // let token = localStorage.getItem("token");
  // const [myCart, setMyCart] = useState([]);

  const [quantity, setQuantity] = useState({ quantity: 1 });

  const handleChange = async (event) => {
    event.preventDefault();
    setQuantity({ ...quantity, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const updatedQuantity = await updateCartProductQuantity(
      token,
      cart.products.id,
      quantity
    );
    setQuantity({ quantity: 1 });
  };
  console.log(cart);
  return (
    <>
      <h2>cart:</h2>
      <div>
        {cart.products ? (
          cart.products.map((product) => {
            return (
              <div key={`product-${product.id}`}>
                <h3>{product.name}</h3>
                <img
                  className="productImage"
                  src={product.image_url}
                  alt={`${product.name} Image`}
                />
                <p>${product.price}</p>
                <p>{product.quantity}</p>
                <select onClick={handleSubmit}>
                  <option value={0} name="quantity" onClick={handleChange}>
                    0
                  </option>
                  <option value={1} name="quantity" onClick={handleChange}>
                    1
                  </option>
                  <option value={2} name="quantity" onClick={handleChange}>
                    2
                  </option>
                  <option value={3} name="quantity" onClick={handleChange}>
                    3
                  </option>
                  <option value={4} name="quantity" onClick={handleChange}>
                    4
                  </option>
                  <option value={5} name="quantity" onClick={handleChange}>
                    5
                  </option>
                </select>
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
        <Link to={"/checkout"}>
          <button>Checkout Here!</button>
        </Link>
      </div>
    </>
  );
};
export default Cart;
