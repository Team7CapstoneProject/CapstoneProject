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
  const [error, setError] = useState(false);

  //Toggles the edit product form on and off
  function handleClickSeeEditProductForm(event) {
    event.preventDefault();
    if (!displayEditProduct) {
      setDisplayEditProduct(true);
    } else {
      setDisplayEditProduct(false);
    }
  }

  //Actions taken when submit form is pressed:
  async function onSubmitEditProduct(event) {
    //Prevents page refresh when button is pressed
    event.preventDefault();
    let token = localStorage.getItem("token");
    let productId = product.id;

    //Takes form inputs and equates it to variable needed for updateProduct function to pass.
    let name = event.target[0].value;
    let description = event.target[1].value;
    let price = event.target[2].value;
    let image_url = event.target[3].value;
    let inventory = event.target[4].value;
    let on_sale = event.target[5].value;
    let sale_percentage = event.target[6].value;

    //If any of these input fields are empty or undefined, it retains the existing value.
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

    //Run updateProduct function
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

    //If no error occurs:
    //Update the edit card message so it tells the user that the update was successful
    //Update state of product info so that it reflects the updated info without having to refresh the page.
    //If error occurs:
    //Tells user what part of the edit process failed.
    if (!editProduct.error) {
      setEditMessage(editProduct.message);
      setProductInfo(editProduct.updatedProduct);
      setError(false);
      setDisplayEditProduct(false);
    } else {
      setError(true);
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
              <div>
                {error ? (
                  <div className="adminProductError">{editMessage}</div>
                ) : (
                  <div>{editMessage}</div>
                )}
              </div>
              <form
                onSubmit={onSubmitEditProduct}
                className="adminEditProductForm"
              >
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
