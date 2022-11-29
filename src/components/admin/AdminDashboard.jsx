import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../api";
import {Users} from "../";

const AdminDashboard = () => {
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
      </div>
    </>
  );
};
export default AdminDashboard;
