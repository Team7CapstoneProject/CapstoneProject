import React, { useState } from "react";
import { createProduct } from "../../api";

const CreateProduct = ({
  allAdminProducts,
  setAllAdminProducts,
  displayCreateProduct,
  setDisplayCreateProduct,
  setDisplayUsers,
  setDisplayAdminProducts,
}) => {
  const [editMessage, setEditMessage] = useState("Create a new product");

  function handleClickSeeCreateProduct(event) {
    if (!displayCreateProduct) {
      event.preventDefault();
      setDisplayCreateProduct(true);
      setDisplayUsers(false);
      setDisplayAdminProducts(false);
    } else {
      setDisplayCreateProduct(false);
    }
  }
  async function handleSubmitCreateProduct(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const name = event.target[0].value;
    const description = event.target[1].value;
    const price = event.target[2].value;
    const image_url = event.target[3].value;
    const inventory = event.target[4].value;
    const on_sale = false;
    const sale_percentage = 0;

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

    if (!newProduct.error) {
      setEditMessage(newProduct.message);
      setAllAdminProducts([...allAdminProducts, newProduct.product])
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
      <div>
        <button onClick={handleClickSeeCreateProduct} className="navButton">
          Create Product
        </button>
        <div>
          {displayCreateProduct ? (
            <div className="createProductCard">
              <div>{editMessage}</div>
              <form onSubmit={handleSubmitCreateProduct}>
                <div>
                  <label>Name:</label>
                  <input htmlFor="name" placeholder="Name" required></input>
                  <label>Description:</label>
                  <input
                    htmlFor="description"
                    placeholder="Description"
                    required
                  ></input>
                  <label>Price:</label>
                  <input htmlFor="price" placeholder="Price" required></input>
                  <label>Image Link:</label>
                  <input
                    htmlFor="image_url"
                    placeholder="Image Link"
                    required
                  ></input>
                  <label>Inventory:</label>
                  <input
                    htmlFor="inventory"
                    placeholder="Inventory"
                    required
                  ></input>
                  <button type="submit" className="buttonSubmit">
                    Submit
                  </button>
                </div>
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
export default CreateProduct;
