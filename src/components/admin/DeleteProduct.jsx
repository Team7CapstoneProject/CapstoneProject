import React from "react";

import { deleteProduct } from "../../api";

const DeleteProduct = ({
  adminProduct,
  allAdminProducts,
  setAllAdminProducts,
}) => {
  async function onClickDeleteProduct(event) {
    event.preventDefault();
    let productId = adminProduct.id;
    let token = localStorage.getItem("token");
    let deletedProduct = await deleteProduct(token, productId);

    console.log(deletedProduct, "this is deleted Product")
    if (!deletedProduct.error) {
        allAdminProducts = allAdminProducts.filter((adminProduct) => adminProduct.id !== deletedProduct.product.id);
      setAllAdminProducts(allAdminProducts);
    }
  }

  return (
    <>
      <div>
        <button onClick={onClickDeleteProduct} className="buttonDelete">
          Delete Product
        </button>
      </div>
    </>
  );
};
export default DeleteProduct;
