import React from "react";
import { Product } from "../";

const Products = ({ products, cart, setCart }) => {
  return (
    <>
      <div className="products">
        {products.length ? (
          products.map((product) => {
            return <Product key={`product-${product.id}`} product={product} cart={cart} setCart={setCart}/>;
          })
        ) : (
          <div>No Products Found</div>
        )}
      </div>
    </>
  );
};

export default Products;
