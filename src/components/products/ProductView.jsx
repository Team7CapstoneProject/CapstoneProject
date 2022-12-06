import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductAddToCart from "./ProductAddToCart";

const ProductView = ({ allProducts }) => {
  let navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleClickReturnToProducts(event) {
    event.preventDefault();
    navigate("/products");
  }

  let { productId } = useParams();
  return (
    <div className="viewCardDiv">
      <div className="viewCard">
        {allProducts.map((product) => {
          if (productId == product.id) {
            return (
              <div className="productInfoView">
                <div
                  key={`productName=${product.name}`}
                  className="productView"
                >
                  <div className="nameView">{product.name}</div>
                  <img
                    className="productImageView"
                    src={product.image_url}
                    alt={`${product.name} Image`}
                  />
                  <div className="priceView">${product.price}</div>
                  <div>{product.description}</div>
                </div>
              </div>
            );
          }
        })}
        <div className="addViewButtonDiv">
          {token ? (
            <div className="addViewButton">
              <ProductAddToCart />
            </div>
          ) : (
            <></>
          )}
        </div>

        <button onClick={handleClickReturnToProducts} className="backButton">
          Back
        </button>
      </div>
    </div>
  );
};

export default ProductView;
