import React from "react";
import { useParams } from "react-router-dom";
import ProductAddToCart from "./ProductAddToCart";

const ViewOfProducts = ({ allProducts }) => {
  let { productId } = useParams();
  return (
    <div className="viewCard">
      {allProducts.map((product) => {
        if (productId == product.id) {
          return (
            <div key={product.name} className="productView">
              <img
                className="productImageView"
                src={product.image_url}
                alt={`${product.name} Image`}
              />
              <div className="productInfoView">
                <div className="nameView">{product.name}</div>
                <div>Description: {product.description}</div>
                <div className="priceView">${product.price}</div>
            </div>
            </div>
          );
        }
      })}
      <div className="addView">
      <ProductAddToCart />
    </div>
    </div>
  );
};

export default ViewOfProducts;
