import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../api";
import { Users, AdminProducts, CreateProduct } from "../";
import "./CSS/admin.css";

const AdminDashboard = ({ allProducts, setAllProducts }) => {

  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    async function fetchAllUsers() {
      const allFetchedUsers = await getAllUsers(localStorage.getItem("token"));
      setAllUsers(allFetchedUsers);
    }
    fetchAllUsers();
  }, []);


//Set of states that dictate which admin button(Create Product, See All Users, See All Products) is visible at any one time. Only one button should be displaying contents at a time.
  const [displayCreateProduct, setDisplayCreateProduct] = useState(false);
  const [displayUsers, setDisplayUsers] = useState(false);
  const [displayAdminProducts, setDisplayAdminProducts] = useState(false);

  return (
    <>
      <div>
        <CreateProduct
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          displayCreateProduct={displayCreateProduct}
          setDisplayCreateProduct={setDisplayCreateProduct}
          setDisplayUsers={setDisplayUsers}
          setDisplayAdminProducts={setDisplayAdminProducts}
        />
        <Users
          allUsers={allUsers}
          displayUsers={displayUsers}
          setAllUsers={setAllUsers}
          setDisplayCreateProduct={setDisplayCreateProduct}
          setDisplayUsers={setDisplayUsers}
          setDisplayAdminProducts={setDisplayAdminProducts}
        />
        <AdminProducts
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
