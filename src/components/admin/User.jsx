import React from "react";
import { DeleteUser, PromoteUser } from "../";

const User = ({ user, allUsers, setAllUsers }) => {
  return (
    <>
      <div className="userCard">
        {/* ------------------  USER INFO ------------------ */}

        <div>{`ID: ${user.id}`}</div>
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

        {/* ------------------ PROMOTE USER BUTTON ------------------ */}
        <div>
          {user.is_admin === true ? (
            <></>
          ) : (
            <div>
              {" "}
              <PromoteUser user={user} />
            </div>
          )}
        </div>

        {/* ------------------ DELETE USER BUTTON ------------------ */}
        <div>
          {user.first_name === "admin" || user.first_name === "Guest" ? (
            <></>
          ) : (
            <div>
              <DeleteUser
                user={user}
                allUsers={allUsers}
                setAllUsers={setAllUsers}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default User;
