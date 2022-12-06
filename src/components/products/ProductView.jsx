import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductAddToCart from "./ProductAddToCart";

const ProductView = ({ allProducts, token, userAccount, cart, setCart }) => {
  let navigate = useNavigate();

  function handleClickReturnToProducts(event) {
    event.preventDefault();
    navigate("/products");
  }

  let { productId } = useParams();
  let product;

  if (allProducts) {
    let filteredProduct = allProducts.filter(
      (product) => productId == product.id
    );
    product = filteredProduct[0];
  }

  return (
    <div className="viewCardDiv">
      <div className="viewCard">
        <div className="productInfoView">
          <div key={`productName=${product.name}`} className="productView">
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

        <div className="addViewButtonDiv">
          {token ? (
            <div className="addViewButton">
              <ProductAddToCart
                token={token}
                userAccount={userAccount}
                product={product}
                cart={cart}
                setCart={setCart}
              />
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
