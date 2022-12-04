import React from "react";
import { promoteUser } from "../../api";

const PromoteUser = ({ token, user, setUserInfo }) => {
  async function onClickPromoteUser(event) {
    //Prevents page refresh when button is pressed
    event.preventDefault();

    //Run promoteUser function
    let promotedUser = await promoteUser(token, user.id);

    if (!promotedUser.error) {
      setUserInfo(promoteUser.promoteUser);
    }
  }

  return (
    <>
      <div>
        <button onClick={onClickPromoteUser} className="buttonEdit">Promote to Admin</button>
      </div>
    </>
  );
};
export default PromoteUser;
