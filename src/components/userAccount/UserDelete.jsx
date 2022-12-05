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
      localStorage.removeItem("token");
      setNavGreeting(
        `We're sad to see you go!`
      );
      navigate("/");
    }
  }

  return (
    <>
      <div>
        <button onClick={onClickDeleteMyAccount} className="buttonDelete">Delete Account</button>
      </div>
    </>
  );
};
export default UserDelete;