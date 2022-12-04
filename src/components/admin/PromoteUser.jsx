import React from "react";
import { promoteUser } from "../../api";

const PromoteUser = ({ token, user, setUserInfo }) => {
  async function onClickPromoteUser(event) {
    //Prevents page refresh when button is pressed
    event.preventDefault();

    //Run promoteUser function
    let promotedUser = await promoteUser(token, user.id);

    //If no error occurs:
    //Updates info state so it reflects new status as admin.
    if (!promotedUser.error) {
      setUserInfo(promotedUser.promotedUser);
    }
  }

  return (
    <>
      <div>
        <button onClick={onClickPromoteUser} className="buttonEdit">
          Promote to Admin
        </button>
      </div>
    </>
  );
};
export default PromoteUser;
