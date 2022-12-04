import React from "react";

import { deleteProduct } from "../../api";

const DeleteProduct = ({
  token,
  product,
  allProducts,
  setAllProducts,
}) => {
  async function onClickDeleteProduct(event) {
    //Prevents page refresh when button is pressed
    event.preventDefault();
    let productId = product.id;
    //Run deleteProduct function
    let deletedProduct = await deleteProduct(token, productId);

    //If no error occurs:
    //Filter existing list of all products so that it does not include the deleted product.
    //Sets state to all products so that it shows all products except the deleted product.
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
