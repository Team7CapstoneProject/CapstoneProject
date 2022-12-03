import React, { useState } from "react";
import { createProduct } from "../../api";

const CreateProduct = ({
  allProducts,
  setAllProducts,
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
      <div>
        <button onClick={handleClickSeeCreateProduct} className="adminButton">
          Create Product
        </button>
        <div className="createProductCardDiv">
          {displayCreateProduct ? (
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
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default CreateProduct;
