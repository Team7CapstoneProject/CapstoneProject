import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserDelete, UserEdit } from "../";

const UserDashboard = ({ token, userAccount, setUserAccount, setNavGreeting }) => {
  let admin = localStorage.getItem("first_name");
  
  return (
    <>
      <div>
        <div>
          <div>Account Information:</div>
          <div>{`First Name: ${userAccount.first_name}`}</div>
          <div>{`Last Name: ${userAccount.last_name}`}</div>
          <div>{`Email: ${userAccount.email}`}</div>
        </div>

        <div>
          <Link to={"/cart"}>
            <button>Your Cart</button>
          </Link>
        </div>

        <div>
          {admin === "admin" ? (
            <></>
          ) : (
            <div>
              <UserEdit
                token={token}
                userAccount={userAccount}
                setUserAccount={setUserAccount}
                setNavGreeting={setNavGreeting}
              />
              <UserDelete
                userAccount={userAccount}
                setNavGreeting={setNavGreeting}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default UserDashboard;
