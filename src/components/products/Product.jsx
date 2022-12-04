import React from "react";
import { ProductAddToCart } from "../";

const Product = ({ product, cart, setCart }) => {
  let token = localStorage.getItem("token");
  let salePrice;
  let finalSalePrice;

  if (product.on_sale === true) {
    let percentageConversion = product.sale_percentage * 0.01;
    salePrice = product.price * (1 - percentageConversion);
    finalSalePrice = Number(salePrice.toFixed(2));
  } else {
    finalSalePrice = product.price;
  }

  return (
    <>
      <div className="productCard">
        <img
          className="productImage"
          src={product.image_url}
          alt={`${product.name} Image`}
        />

        <div className="productInfo">
          <div>{product.name}</div>
          <div>Description: {product.description}</div>
        </div>

        <div>
          {product.on_sale === true ? (
            <div className="productSale">
              <div className="productFinalPrice">{`$${finalSalePrice}`}</div>
              <div className="discountRow">
                <div className="salePercentage">{`${product.sale_percentage}% off!`}</div>
                <div className="productInitialPrice">
                  <strike>{`$${product.price}`}</strike>
                </div>
              </div>
              <div className="productInventory">{`${product.inventory} item(s) left!`}</div>
            </div>
          ) : (
            <div className="productNoSale">
              <div className="productFinalPrice">{`$${finalSalePrice}`}</div>
              <div className="productInventory">{`${product.inventory} item(s) left!`}</div>
            </div>
          )}
        </div>
        {token ? (
          <div>
            {" "}
            <ProductAddToCart product={product} cart={cart} setCart={setCart} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default Product;
