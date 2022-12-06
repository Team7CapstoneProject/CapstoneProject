import React, { useEffect, useState } from "react";
import { ProductAddToCart } from "../";

const Product = ({
  token,
  userAccount,
  product,
  cartProducts,
  setCartProducts,
  cart,
  setCart,
}) => {
  const [stockMessage, setStockMessage] = useState("Available");
  useEffect(() => {
    if (product.inventory === 0) {
      setStockMessage("Out of stock.");
    }
    if (product.inventory <= 10 && product.inventory > 0) {
      setStockMessage("Only a few items left!");
    }
  }, [product]);

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
          {/* <div>Description: {product.description}</div> */}
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
              {/* {product.inventory <= 10 ? (
                <div className="productInventory">{`${product.inventory} item(s) left!`}</div>
              ) : null} */}
            </div>
          ) : (
            <div className="productNoSale">
              <div className="productFinalPrice">{`$${finalSalePrice}`}</div>
            </div>
          )}

          <div className="productInventory">{`${stockMessage}`}</div>
        </div>
        {token && product.inventory !== 0 ? (
          <div>
            {" "}
            <ProductAddToCart
              token={token}
              userAccount={userAccount}
              product={product}
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
              cart={cart}
              setCart={setCart}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default Product;
