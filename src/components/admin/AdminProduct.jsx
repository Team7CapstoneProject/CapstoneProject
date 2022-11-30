import React from "react";

const AdminProduct = ({ adminProduct }) => {
    // console.log("adminProduct data", adminProduct)

    //component is receiving adminProduct data from AdminProducts component
    //here we are mapping through each relevant part of the products data we receive to seperate divs
  return (
    <>
      <div>
        <div>{`Product ID: ${adminProduct.id}`}</div>
        <div>{`Name: ${adminProduct.name}`}</div>
        <div>{`Description: ${adminProduct.description}`}</div>
        <div>{`Image URL: ${adminProduct.image_url}`}</div>
        <div>{`Inventory: ${adminProduct.inventory}`}</div>
        <div>{`Price: ${adminProduct.price}`}</div>
        <div>{`Sale Status: ${adminProduct.on_sale}`}</div>
        <div>{`Sale Discount Percentage: ${adminProduct.sale_percentage}%`}</div>
      </div>
    </>
  );
};
export default AdminProduct;