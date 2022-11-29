import React from "react";
const Product = ({ product }) => {
  
  let salePrice
  let finalSalePrice;

  if (product.on_sale === true) {
    let percentageConversion = product.sale_percentage * 0.01;
    salePrice = product.price * (1 - percentageConversion);
    //.toFixed rounds up the number to the nearest 2 decimal places. 
    //finalSalePrice needs to be force coerced into a number since .toFixed returns a string.
    finalSalePrice = Number(salePrice.toFixed(2))
  } else {
    finalSalePrice = product.price;
  }

  return (
    <>
      <div className="productCard">
        <img
          src={product.image_url}
          alt={product.name}
          className="productImage"
        />

        <div className="productInfo">
          <div>{product.name}</div>
          <div>Description: {product.description}</div>
        </div>

        <div>
          {product.on_sale === true ? (
            <div className="productSale">
              <div className="productFinalPrice">{`$${finalSalePrice}`}</div>
              <div className="saleCard">
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
      </div>
    </>
  );
};
export default Product;
