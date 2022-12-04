import React from "react";
import { promoteUser } from "../../api";

const PromoteUser = ({ user }) => {
  let token = localStorage.getItem("token");

  async function onClickPromoteUser(event) {
    event.preventDefault();
    console.log("pressed promote user button");
    let promotedUser = await promoteUser(token, user.id);

    if (!promotedUser.error) {
      console.log(user.first_name, "user was promoted");
    }
  }

  return (
    <>
      <div>
        <button onClick={onClickPromoteUser}>Promote to Admin</button>
      </div>
    </>
  );
};
export default PromoteUser;
