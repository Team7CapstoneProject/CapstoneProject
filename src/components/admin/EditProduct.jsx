import React from "react";
import { updateProduct, deleteProduct } from "../../api";

const EditProduct = ({ adminProduct }) => {
  async function onClickEditProduct(event) {
    event.preventDefault();
    console.log("EditProduct button working");
    // let editProduct = await updateProduct()
  }

  async function onClickDeleteProduct(event) {
    event.preventDefault();
    let productId = adminProduct.id;
    let token = localStorage.getItem("token");
    let deletedProduct = await deleteProduct(token, productId);
    console.log(deletedProduct, "deleteProduct response")
  }

  return (
    <>
      <div className="editDeleteButtonGroup">
        <button onClick={onClickEditProduct} className="buttonEdit">Edit Product</button>
        <button onClick={onClickDeleteProduct} className="buttonDelete">Delete Product</button>
      </div>
    </>
  );
};
export default EditProduct;
