import React, { useState, useEffect } from "react";
import { getCartByUserId } from "../../api";
import { Link } from "react-router-dom";

const Cart = ({ cart, setCart }) => {
  // let token = localStorage.getItem("token");
  // const [myCart, setMyCart] = useState([]);

  console.log(cart, "CARTTT");
  return (
    <>
      <h2>cart:</h2>
      <div>
        {cart.products.length ? (
          cart.products.map((product) => {
            return (
              <div className="productCard" key={`product-${product.id}`}>
                <h3>{product.name}</h3>
                <img
                  className="productImage"
                  src={product.image_url}
                  alt={`${product.name} Image`}
                />
                <p>${product.price}</p>
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
    </>
  );
};
export default Cart;
