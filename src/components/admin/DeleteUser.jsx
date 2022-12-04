import React from "react";
import { deleteUserAsAdmin } from "../../api";

const DeleteUser = ({ token, user, allUsers, setAllUsers }) => {
  async function onClickDeleteUser(event) {
    //Prevents page refresh when button is pressed
    event.preventDefault();
    let userId = user.id;

    //Run deleteUser function
    let deletedUser = await deleteUserAsAdmin(token, userId);

    //If no error occurs:
    //Filter existing list of all users so that it does not include the deleted user.
    //Sets state to all users so that it shows all users except the deleted user.
    if (!deletedUser.error) {
      allUsers = allUsers.filter((user) => user.id !== deletedUser.user.id);
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
