import React from "react";
import { deleteUserAccountAsAdmin } from "../../api";

const DeleteUser = ({ user }) => {
  async function handleClickDeleteUserAsAdmin(event) {
    event.preventDefault();

    let userId = user.id;
    let token = localStorage.getItem("token");
    let deleteUserResponse = await deleteUserAccountAsAdmin(token, userId);
    console.log(deleteUserResponse, "delete response");
  }

  return (
    <>
      <div>
        <button onClick={handleClickDeleteUserAsAdmin} className="buttonDelete">Delete User</button>
      </div>
    </>
  );
};
export default DeleteUser;
