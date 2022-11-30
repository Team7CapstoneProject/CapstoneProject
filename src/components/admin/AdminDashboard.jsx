import React, { useEffect, useState } from "react";
import { getAllUsers, getAllProducts } from "../../api";
import {Users, AdminProducts, CreateProduct} from "../";

const AdminDashboard = () => {
  // console.log("all product data!", allAdminProducts)

  const [allAdminProducts, setAllAdminProducts] = useState([]);
  useEffect(() => {
    async function fetchAllAdminProducts() {
      const productResponse = await getAllProducts();
      // console.log("all product data", productResponse)
      setAllAdminProducts(productResponse);
      
    }
    fetchAllAdminProducts();
  }, []);

  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    async function fetchAllUsers() {
      const allFetchedUsers = await getAllUsers(localStorage.getItem("token"));
      setAllUsers(allFetchedUsers);
    }
    fetchAllUsers();
  }, []);

  return (
    <>
      <div>
        <Users allUsers={allUsers}/>
        <AdminProducts allAdminProducts={allAdminProducts}/>
        <CreateProduct/>
      </div>
    </>
  );
};
export default AdminDashboard;
