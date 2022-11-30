import React, { useEffect, useState } from "react";
import { getAllUsers, getAllProducts } from "../../api";
import {Users, AdminProducts} from "../";

const AdminDashboard = () => {

  //this state contains any products fetched from the use effect set up here
  const [allAdminProducts, setAllAdminProducts] = useState([]);
  useEffect(() => {
    async function fetchAllAdminProducts() {
      const productResponse = await getAllProducts();
      // console.log("all product data", productResponse)
      setAllAdminProducts(productResponse);
      
    }
    fetchAllAdminProducts();
  }, []);

  //this state contains any users fetched from the use effect set up here
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    async function fetchAllUsers() {
      const allFetchedUsers = await getAllUsers(localStorage.getItem("token"));
      setAllUsers(allFetchedUsers);
    }
    fetchAllUsers();
  }, []);

  //currently just have 2 buttons for specific admin functionality 
  //passing both pieces of state to respective components 
  return (
    <>
      <div>
        <Users allUsers={allUsers}/>
        <AdminProducts allAdminProducts={allAdminProducts}/>
      </div>
    </>
  );
};
export default AdminDashboard;
