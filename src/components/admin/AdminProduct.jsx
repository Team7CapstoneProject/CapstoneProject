import React, { useState } from "react";
import { EditProduct, DeleteProduct } from "../";

const AdminProduct = ({
  allProducts,
  setAllProducts,
  product,
}) => {
  //Updates state of product info when product is being updated
  const [productInfo, setProductInfo] = useState(product);

  //This displays the edit product form and hides the delete product button so it doesn't get pressed on accident.
  const [displayEditProduct, setDisplayEditProduct] = useState(false);

  //Calculates final sale price if
  let salePrice;
  let finalSalePrice;
  if (productInfo.on_sale === true) {
    let percentageConversion = productInfo.sale_percentage * 0.01;
    salePrice = productInfo.price * (1 - percentageConversion);

    finalSalePrice = Number(salePrice.toFixed(2));
  } else {
    finalSalePrice = productInfo.price;
  }

  return (
    <>
      <div className="adminProductCard">
        <div>{`Name: ${productInfo.name}`}</div>
        <div>{`Description: ${productInfo.description}`}</div>
        <div>{`Inventory: ${productInfo.inventory}`}</div>
        <div>{`Price: $${productInfo.price}`}</div>
        <div>
          {productInfo.on_sale === true ? (
            <div>
              {" "}
              <div>{`Sale Percentage: ${productInfo.sale_percentage}%`}</div>
              <div>{`Sale Price: $${finalSalePrice}`}</div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <EditProduct
          product={product}
          productInfo={productInfo}
          setProductInfo={setProductInfo}
          displayEditProduct={displayEditProduct}
          setDisplayEditProduct={setDisplayEditProduct}
        />

        {displayEditProduct === false ? (
          <DeleteProduct
          product={product}
            allProducts={allProducts}
            setAllProducts={setAllProducts}

          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default AdminProduct;
