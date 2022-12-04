import React, { useEffect, useState } from "react";
import { Users, AdminProducts, CreateProduct } from "../";
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

  return (
    <>
      <div className="adminBar">
        <CreateProduct
          token={token}
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          displayCreateProduct={displayCreateProduct}
          setDisplayCreateProduct={setDisplayCreateProduct}
          setDisplayUsers={setDisplayUsers}
          setDisplayAdminProducts={setDisplayAdminProducts}
        />
        <Users
          token={token}
          allUsers={allUsers}
          displayUsers={displayUsers}
          setAllUsers={setAllUsers}
          setDisplayCreateProduct={setDisplayCreateProduct}
          setDisplayUsers={setDisplayUsers}
          setDisplayAdminProducts={setDisplayAdminProducts}
        />
        <AdminProducts
          token={token}
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          displayAdminProducts={displayAdminProducts}
          setDisplayCreateProduct={setDisplayCreateProduct}
          setDisplayUsers={setDisplayUsers}
          setDisplayAdminProducts={setDisplayAdminProducts}
        />
      </div>
    </>
  );
};
export default AdminDashboard;
