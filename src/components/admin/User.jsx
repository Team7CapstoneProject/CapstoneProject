import React from "react";
import { DeleteUser } from "../";

const User = ({ user }) => {
  return (
    <>
      <div className="userCard">
        {/* <div>{`User ID: ${user.id}`}</div> */}
        <div>{`First Name: ${user.first_name}`}</div>
        <div>{`Last Name: ${user.last_name}`}</div>
        <div>{`Email: ${user.email}`}</div>
        <div>
          {user.is_admin === true ? (
            <div className="isAdmin">{`Administrator`}</div>
          ) : (
            <div className="isNotAdmin">{`User`}</div>
          )}
        </div>

        <div>{user.is_admin === true ? <></> : <DeleteUser user={user} />}</div>
      </div>
    </>
  );
};
export default User;
