import React, { useState } from "react";
import { EditProduct, DeleteProduct } from "../";

const AdminProduct = ({
  adminProduct,
  allAdminProducts,
  setAllAdminProducts,
}) => {
  // console.log("adminProduct data", adminProduct);

  //component is receiving adminProduct data from AdminProducts component
  //here we are mapping through each relevant part of the products data we receive to seperate divs

  //Updates state of product info when product is being updated
  const [productInfo, setProductInfo] = useState(adminProduct);

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
        {/* <div>{`Product ID: ${productInfo.id}`}</div> */}
        <div>{`Name: ${productInfo.name}`}</div>
        <div>{`Description: ${productInfo.description}`}</div>
        {/* <div>{`Image URL: ${adminProduct.image_url}`}</div> */}
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
          adminProduct={adminProduct}
          productInfo={productInfo}
          setProductInfo={setProductInfo}
          displayEditProduct={displayEditProduct}
          setDisplayEditProduct={setDisplayEditProduct}
        />

        {displayEditProduct === false ? (
          <DeleteProduct
            adminProduct={adminProduct}
            allAdminProducts={allAdminProducts}
            setAllAdminProducts={setAllAdminProducts}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default AdminProduct;
