import React, { useState } from "react";
import { DeleteUser, PromoteUser } from "../";

const User = ({ token, user, allUsers, setAllUsers }) => {
  //Sets initial state of all the user info
  const [userInfo, setUserInfo] = useState(user);

  return (
    <>
      <div className="userCard">
        {/* ------------------  USER INFO ------------------ */}

        <div>{`ID: ${userInfo.id}`}</div>
        <div>{`First Name: ${userInfo.first_name}`}</div>
        <div>{`Last Name: ${userInfo.last_name}`}</div>
        <div>{`Email: ${userInfo.email}`}</div>
        <div>
          {userInfo.is_admin === true ? (
            <div className="isAdmin">{`Administrator`}</div>
          ) : (
            <div className="isNotAdmin">{`User`}</div>
          )}
        </div>

        {/* ------------------ PROMOTE USER BUTTON ------------------ */}
        <div>
          {userInfo.is_admin === true || user.first_name === "Guest" ? (
            <></>
          ) : (
            <div>
              {" "}
              <PromoteUser
                token={token}
                user={user}
                setUserInfo={setUserInfo}
              />
            </div>
          )}
        </div>

        {/* ------------------ DELETE USER BUTTON ------------------ */}
        <div>
          {user.email === "admin" || user.email === "guestuser"  ? (
            <></>
          ) : (
            <div>
              <DeleteUser
                token={token}
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
