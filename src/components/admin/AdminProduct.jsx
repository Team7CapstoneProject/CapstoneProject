import React, { useState } from "react";
import { EditProduct } from "../";

const AdminProduct = ({
  adminProduct,
  allAdminProducts,
  setAllAdminProducts,
}) => {
  // console.log("adminProduct data", adminProduct);

  //component is receiving adminProduct data from AdminProducts component
  //here we are mapping through each relevant part of the products data we receive to seperate divs

//Updates state of product info when product is being updated
  const [productInfo, setProductInfo]=useState(adminProduct)

  return (
    <>
      <div className="adminProductCard">
        <div>{`Product ID: ${productInfo.id}`}</div>
        <div>{`Name: ${productInfo.name}`}</div>
        <div>{`Description: ${productInfo.description}`}</div>
        {/* <div>{`Image URL: ${adminProduct.image_url}`}</div> */}
        <div>{`Inventory: ${productInfo.inventory}`}</div>
        <div>{`Price: $${productInfo.price}`}</div>
        <div>
          {productInfo.on_sale === true ? (
            <div>
              {" "}
              <div>{`Sale Status: ${productInfo.on_sale}`}</div>
              <div>{`Sale Discount Percentage: ${productInfo.sale_percentage}%`}</div>
            </div>
          ) : (
            <div>{`Sale Status: ${productInfo.on_sale}`}</div>
          )}
        </div>

        <EditProduct adminProduct={adminProduct} setProductInfo={setProductInfo}/>
      </div>
    </>
  );
};
export default AdminProduct;
