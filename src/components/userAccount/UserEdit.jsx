import React, { useState } from "react";
import { updateAccount } from "../../api";

const UserEdit = ({ token, userAccount, setUserAccount, setNavGreeting }) => {
  const [editMessage, setEditMessage] = useState("Edit Form");

  async function onSubmitEditUser(event) {
    event.preventDefault();

    let first_name = event.target[0].value;
    let last_name = event.target[1].value;
    let email = event.target[2].value;

    if (
      (first_name === undefined || first_name === "") &&
      (last_name === undefined || last_name === "") &&
      (email === undefined || email === "")
    ) {
      setEditMessage("Your fields are empty.");
      setNavGreeting(`Welcome back, ${userAccount.first_name}!`);
    } else {
      if (first_name === undefined || first_name === "") {
        first_name = userAccount.first_name;
      }
      if (last_name === undefined || last_name === "") {
        last_name = userAccount.last_name;
      }
      if (email === undefined || email === "") {
        email = userAccount.email;
      }

      let editUser = await updateAccount(token, first_name, last_name, email);
      console.log(editUser, "this is editUser")
      if (!editUser.error) {
        setEditMessage(editUser.message);
        setNavGreeting(editUser.message);
        setUserAccount(editUser.updatedUser);
      } else {
        setEditMessage(editUser.message);
      }
    }
  }

  return (
    <>
      <div>
        <div>{editMessage}</div>
        <form onSubmit={onSubmitEditUser}>
          <label htmlFor="first_name">First Name: </label>
          <input
            type="text"
            name="first_name"
            placeholder={userAccount.first_name}
          />

          <label htmlFor="last_name">Last Name: </label>
          <input
            type="text"
            name="last_name"
            placeholder={userAccount.last_name}
          />

          <label htmlFor="email">Email: </label>
          <input type="text" name="email" placeholder={userAccount.email} />

          <button className="buttonEdit">Finish Edit</button>
        </form>
      </div>{" "}
    </>
  );
};
export default UserEdit;
