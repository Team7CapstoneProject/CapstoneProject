import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteMyAccount } from "../../api";

const UserDelete = ({ setNavGreeting }) => {
  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  async function onClickDeleteMyAccount(event) {
    event.preventDefault();
    let deletedAccount = await deleteMyAccount(token);
    if (!deletedAccount.error) {
      localStorage.removeItem("first_name");
      localStorage.removeItem("token");
      setNavGreeting(
        `Your account was successfully deleted. Please sign in or register to continue.`
      );
      navigate("/");
    }
  }

  return (
    <>
      <div>
        <button onClick={onClickDeleteMyAccount}>Delete Account</button>
      </div>
    </>
  );
};
export default UserDelete;
