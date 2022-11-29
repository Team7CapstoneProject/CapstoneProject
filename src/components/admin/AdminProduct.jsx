import React from "react";

const AdminProduct = ({ adminProduct }) => {
    console.log("adminProduct data", adminProduct)
  return (
    <>
      <div>
        <div> Hello there!
          {/* <div>{`AdminProduct ID: ${user.id}`}</div>
          <div>{`First Name: ${user.first_name}`}</div>
          <div>{`Last Name: ${user.last_name}`}</div>
          <div>{`Email: ${user.email}`}</div>
          <div>{`Admin: ${user.is_admin}`}</div> */}
        </div>
      </div>
    </>
  );
};
export default AdminProduct;