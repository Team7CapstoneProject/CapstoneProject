import React, { useState } from "react";
import { createProduct } from "../../api";

const CreateProduct = ({ token, allProducts, setAllProducts }) => {
  const [editMessage, setEditMessage] = useState("Create a new product");

  async function handleSubmitCreateProduct(event) {
    //Prevents page refresh when button is pressed
    event.preventDefault();
    //Takes form inputs and equates it to variable needed for createProduct function to pass.
    const name = event.target[0].value;
    const description = event.target[1].value;
    const price = event.target[2].value;
    const image_url = event.target[3].value;
    const inventory = event.target[4].value;
    const on_sale = false;
    const sale_percentage = 0;

    //Creates a new product
    const newProduct = await createProduct(
      token,
      name,
      description,
      price,
      image_url,
      inventory,
      on_sale,
      sale_percentage
    );

    //If no error occurs:
    //Update the card message so it tells the user that the post was successful
    //Update the state of the products shown so that it includes the new product.
    //If error occurs:
    //Tells user what part of the create process failed.
    if (!newProduct.error) {
      setEditMessage(newProduct.message);
      setAllProducts([...allProducts, newProduct.product]);
      event.target[0].value = null;
      event.target[1].value = null;
      event.target[2].value = null;
      event.target[3].value = null;
      event.target[4].value = null;
    } else {
      setEditMessage(newProduct.message);
    }
  }
  return (
    <>
      <div className="createProductCard">
        <div className="editMessage">{editMessage}</div>
        <form
          onSubmit={handleSubmitCreateProduct}
          className="createProductForm"
        >
          <div className="subCreateProductFormDiv">
            <label>Name:</label>
            <input
              htmlFor="name"
              // placeholder="Name"
              className="inputCP"
              required
            ></input>{" "}
            <br />
            <label>Description:</label>
            <input
              htmlFor="description"
              // placeholder="Description"
              className="inputCP"
              required
            ></input>{" "}
            <br />
            <label>Price:</label>
            <input
              htmlFor="price"
              // placeholder="Price"
              className="inputCP"
              required
            ></input>{" "}
            <br />
            <label>Image Link:</label>
            <input
              htmlFor="image_url"
              // placeholder="Image Link"
              className="inputCP"
              required
            ></input>{" "}
            <br />
            <label>Inventory:</label>
            <input
              htmlFor="inventory"
              // placeholder="Inventory"
              className="inputCP"
              required
            ></input>{" "}
            <br />
            <button type="submit" className="buttonSubmit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default CreateProduct;
