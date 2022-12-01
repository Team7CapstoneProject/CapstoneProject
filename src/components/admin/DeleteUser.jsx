import React from "react";
import { deleteUserAccountAsAdmin } from "../../api";

const DeleteUser = ({ user, allUsers, setAllUsers }) => {
  async function handleClickDeleteUserAsAdmin(event) {
    event.preventDefault();

    console.log("delete button pressed");
    let userId = user.id;
    let token = localStorage.getItem("token");

    if (userId && token) {
      let deleteUserResponse = await deleteUserAccountAsAdmin(token, userId);

      if (!deleteUserResponse.error) {
        allUsers = allUsers.filter((user) => user.id !== deleteUserResponse.id);
        setAllUsers(allUsers);
      }
    }
  }

  return (
    <>
      <div>
        <button onClick={handleClickDeleteUserAsAdmin} className="buttonDelete">
          Delete User
        </button>
      </div>
    </>
  );
};
export default DeleteUser;
