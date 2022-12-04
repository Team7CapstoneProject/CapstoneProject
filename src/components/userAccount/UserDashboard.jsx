import React from "react";
import { Link } from "react-router-dom";
import { UserEdit, UserDelete } from "../";

const UserDashboard = ({ userAccount, setNavGreeting }) => {
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
              <UserEdit userAccount={userAccount} />
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
