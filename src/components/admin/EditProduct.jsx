import React, { useState } from "react";
import { updateProduct, deleteProduct } from "../../api";

const EditProduct = ({ adminProduct, setProductInfo }) => {
  const [displayEditProduct, setDisplayEditProduct] = useState(false);

  async function onClickEditProduct(event) {
    event.preventDefault();

    let token = localStorage.getItem("token");
    let productId = adminProduct.id;

    let name = "pear";
    let description = "bunny";
    let price = 10000;
    let image_url = "www.bunny.com";
    let inventory = 12;
    let on_sale = true;
    let sale_percentage = 20;

    let editProduct = await updateProduct(
      token,
      productId,
      name,
      description,
      price,
      image_url,
      inventory,
      on_sale,
      sale_percentage
    );

    if (!editProduct.error) {
      setProductInfo(editProduct.updatedProduct);
    }
  }

  async function onClickDeleteProduct(event) {
    event.preventDefault();
    let productId = adminProduct.id;
    let token = localStorage.getItem("token");
    let deletedProduct = await deleteProduct(token, productId);
    console.log(deletedProduct, "deleteProduct response");
  }

  return (
    <>
      <div className="editDeleteButtonGroup">
        <button onClick={onClickEditProduct} className="buttonEdit">
          Edit Product
        </button>
        <button onClick={onClickDeleteProduct} className="buttonDelete">
          Delete Product
        </button>
      </div>
    </>
  );
};
export default EditProduct;
