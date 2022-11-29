import React from "react";
import { Product } from "../";

const Products = ({ products }) => {
  return (
    <>
      <div className="products">
        {products.length ? (
          products.map((product) => {
            return <Product key={`product-${product.id}`} product={product} />;
          })
        ) : (
          <div>No Products Found</div>
        )}
      </div>
    </>
  );
};

export default Products;
