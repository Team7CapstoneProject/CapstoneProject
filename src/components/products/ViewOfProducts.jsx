import React from "react";
import { useParams } from "react-router-dom";
import ProductAddToCart from "./ProductAddToCart";

const ViewOfProducts = ({ allProducts }) => {
  let { productId } = useParams();
  console.log(productId);
  console.log(allProducts);
  return (
    <div>
      {allProducts.map((product) => {
        if (productId == product.id) {
          return (
            <div>
              <img
                className="productImage"
                src={product.image_url}
                alt={`${product.name} Image`}
              />
              <div className="productInfo">
                <div>{product.name}</div>
                <div>Description: {product.description}</div>
              </div>
              <div>${product.price}</div>
            </div>
          );
        }
      })}
      <ProductAddToCart />
    </div>
  );
};

export default ViewOfProducts;
