import React from "react";

import { deleteProduct } from "../../api";

const DeleteProduct = ({
  product,
  allProducts,
  setAllProducts,

}) => {
  async function onClickDeleteProduct(event) {
    event.preventDefault();
    let productId = product.id;
    let token = localStorage.getItem("token");
    let deletedProduct = await deleteProduct(token, productId);

    console.log(deletedProduct, "this is deleted Product")
    if (!deletedProduct.error) {
      allProducts = allProducts.filter((product) => product.id !== deletedProduct.product.id);
        setAllProducts(allProducts);
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
