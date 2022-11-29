import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../api";
const AdminDashboard = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    async function fetchAllUsers(){
      const allFetchedUsers = await getAllUsers(localStorage.getItem("token"))
      setAllUsers(allFetchedUsers)
      console.log("allUsersData!", allFetchedUsers)
    }
    fetchAllUsers();
  }, [])

  return (
    <>
      <div>{allUsers[0]}</div>
    </>
  );
};
export default AdminDashboard;