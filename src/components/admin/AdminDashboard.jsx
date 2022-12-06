import React, { useEffect, useState } from "react";
import { UserSearch, AdminProductsSearch, CreateProduct } from "../";
import { getAllUsers } from "../../api";
import "./CSS/admin.css";

const AdminDashboard = ({ token, allProducts, setAllProducts }) => {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    async function fetchAllUsers() {
      const allFetchedUsers = await getAllUsers(token);
      setAllUsers(allFetchedUsers);
    }
    fetchAllUsers();
  }, []);

  //Set of states that dictate which admin button(Create Product, See All Users, See All Products) is visible at any one time. Only one button should be displaying contents at a time.
  const [displayCreateProduct, setDisplayCreateProduct] = useState(false);
  const [displayUsers, setDisplayUsers] = useState(false);
  const [displayAdminProducts, setDisplayAdminProducts] = useState(false);

  //Initially sets displayUsers to true so that every time the admin dashboard button is pressed, all users are already displayed
  useEffect(() => {
    setDisplayUsers(true);
  }, []);

  //----------- CREATE PRODUCT TAB TOGGLE ------------------
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

  //----------- SEE ALL USERS TAB TOGGLE ------------------
  function handleClickSeeAllUsers(event) {
    event.preventDefault();
    if (!displayUsers) {
      setDisplayUsers(true);
      setDisplayCreateProduct(false);
      setDisplayAdminProducts(false);
    } else {
      setDisplayUsers(false);
    }
  }

  //----------- SEE ALL PRODUCTS TAB TOGGLE ------------------
  function handleClickSeeAllAdminProducts(event) {
    if (!displayAdminProducts) {
      event.preventDefault();
      setDisplayAdminProducts(true);
      setDisplayCreateProduct(false);
      setDisplayUsers(false);
    } else {
      setDisplayAdminProducts(false);
    }
  }

  return (
    <>
      {/* ----------------------- ADMIN NAV BUTTONS ----------------------- */}
      <div className="adminBar">
        <button onClick={handleClickSeeCreateProduct} className="adminButton">
          Create Product
        </button>

        <button onClick={handleClickSeeAllUsers} className="adminButton">
          See All Users
        </button>

        <button
          onClick={handleClickSeeAllAdminProducts}
          className="adminButton"
        >
          See All Products
        </button>
      </div>

      {/* ----------------------- CREATE PRODUCT ----------------------- */}
      <div>
        {displayCreateProduct ? (
          <CreateProduct
            token={token}
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            displayCreateProduct={displayCreateProduct}
            setDisplayCreateProduct={setDisplayCreateProduct}
            setDisplayUsers={setDisplayUsers}
            setDisplayAdminProducts={setDisplayAdminProducts}
          />
        ) : null}
      </div>
      {/* ----------------------- USERS ----------------------- */}
      <div>
        {displayUsers ? (
          <UserSearch
            token={token}
            allUsers={allUsers}
            displayUsers={displayUsers}
            setAllUsers={setAllUsers}
            setDisplayCreateProduct={setDisplayCreateProduct}
            setDisplayUsers={setDisplayUsers}
            setDisplayAdminProducts={setDisplayAdminProducts}
          />
        ) : null}
      </div>

      {/* ----------------------- ADMIN PRODUCTS ----------------------- */}
      {displayAdminProducts ? (
        <div>
          <AdminProductsSearch
            token={token}
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            displayAdminProducts={displayAdminProducts}
            setDisplayCreateProduct={setDisplayCreateProduct}
            setDisplayUsers={setDisplayUsers}
            setDisplayAdminProducts={setDisplayAdminProducts}
          />
        </div>
      ) : null}
    </>
  );
};
export default AdminDashboard;
