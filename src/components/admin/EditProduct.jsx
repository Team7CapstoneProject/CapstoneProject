import React, { useState } from "react";
import { updateProduct } from "../../api";

const EditProduct = ({
  product,
  productInfo,
  setProductInfo,
  displayEditProduct,
  setDisplayEditProduct,
}) => {
  //Displays to the user if editing the object was a success or not.
  const [editMessage, setEditMessage] = useState("Edit Form");

  //When you hit the edit product, the form shows up.
  function handleClickSeeEditProductForm(event) {
    if (!displayEditProduct) {
      event.preventDefault();
      setDisplayEditProduct(true);
    } else {
      setDisplayEditProduct(false);
    }
  }

  async function onSubmitEditProduct(event) {
    event.preventDefault();
    console.log("finish edit button clicked");
    let token = localStorage.getItem("token");
    let productId = product.id;

    let name = event.target[0].value;
    let description = event.target[1].value;
    let price = event.target[2].value;
    let image_url = event.target[3].value;
    let inventory = event.target[4].value;
    let on_sale = event.target[5].value;
    let sale_percentage = event.target[6].value;

    if (name === undefined || name === "") {
      name = product.name;
    }
    if (description === undefined || description === "") {
      description = product.description;
    }
    if (price === undefined || price === "") {
      price = product.price;
    }
    if (image_url === undefined || image_url === "") {
      image_url = product.image_url;
    }
    if (inventory === undefined || inventory === null || inventory === "") {
      inventory = product.inventory;
    }
    if (on_sale === "On Sale") {
      on_sale = true;
    } else {
      on_sale = false;
    }
    if (
      sale_percentage === undefined ||
      sale_percentage === null ||
      sale_percentage === ""
    ) {
      sale_percentage = product.sale_percentage;
    }

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
      setEditMessage(editProduct.message);
      setDisplayEditProduct(false);
    } else {
      setEditMessage(editProduct.message);
    }
  }

  return (
    <>
      <div className="editDeleteButtonGroup">
        <button onClick={handleClickSeeEditProductForm} className="buttonEdit">
          Edit Product
        </button>
        <div>
          {displayEditProduct ? (
            <div>
              <div>{editMessage}</div>
              <form onSubmit={onSubmitEditProduct}>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" placeholder={productInfo.name} />
                <label htmlFor="description">Description: </label>
                <input
                  type="text"
                  name="description"
                  placeholder={productInfo.description}
                />
                <label htmlFor="price">Price: </label>
                <input
                  type="text"
                  name="price"
                  placeholder={productInfo.price}
                />
                <label htmlFor="image_url">Image link: </label>
                <input
                  type="text"
                  name="image_url"
                  placeholder={productInfo.image_url}
                />
                <label htmlFor="inventory">Inventory: </label>
                <input
                  type="text"
                  name="inventory"
                  placeholder={productInfo.inventory}
                />{" "}
                <label htmlFor="name">Sale: </label>
                <select>
                  <option>Not on Sale</option>
                  <option>On Sale</option>
                </select>
                <label htmlFor="sale_percentage">Sale Percentage: </label>
                <input
                  type="text"
                  name="sale_percentage"
                  placeholder={productInfo.sale_percentage}
                />
                <button className="buttonEdit">Finish Edit</button>
              </form>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default EditProduct;
