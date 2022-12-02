import React from "react";
import { deleteUserAsAdmin } from "../../api";

const DeleteUser = ({ user, allUsers, setAllUsers }) => {
  async function onClickDeleteUser(event) {
    event.preventDefault();
    let userId = user.id;
    let token = localStorage.getItem("token");

    let deletedUser = await deleteUserAsAdmin(token, userId);

    if (!deletedUser.error) {
      allUsers = allUsers.filter((user) => user.id !== deletedUser.id);
      setAllUsers(allUsers);
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
