import React from "react";
const Product = ({product}) => {
  return (
    <>
      <div>{product.name}</div>
      <div>{product.description}</div>
    </>
  );
};
export default Product;
