import React from "react";
import { deleteUserAsAdmin } from "../../api";

const DeleteUser = ({ user, allUsers, setAllUsers }) => {
  async function onClickDeleteUser(event) {
    event.preventDefault();
    console.log("delete user button clicked");
    let userId = user.id;
    let token = localStorage.getItem("token");

    try {
      let deletedUser = await deleteUserAsAdmin(token, userId);
      if (!deletedUser.error) {
        allUsers = allUsers.filter((user) => user.id !== deletedUser.user.id);
        setAllUsers(allUsers);
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <>
      <div>
        <button onClick={onClickDeleteUser} className="buttonDelete">
          Delete User
        </button>
      </div>
    </>
  );
};
export default DeleteUser;
