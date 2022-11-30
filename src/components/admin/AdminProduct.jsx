import React from "react";
import {EditProduct} from "../"

const AdminProduct = ({ adminProduct }) => {
  return (
    <>
      <div>
        <div>
          <div>{`Product ID: ${adminProduct.id}`}</div>
          <div>{`Product Name: ${adminProduct.name}`}</div>
          <div>{`Product Price: $${adminProduct.price}`}</div>


          {/* <div>{`First Name: ${user.first_name}`}</div>
          <div>{`Last Name: ${user.last_name}`}</div>
          <div>{`Email: ${user.email}`}</div>
          <div>{`Admin: ${user.is_admin}`}</div> */}
        </div>
        <EditProduct adminProduct={adminProduct}/>
      </div>
    </>
  );
};
export default AdminProduct;