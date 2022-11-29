import React from "react";

const User = ({ user }) => {
  return (
    <>
      <div>
        <div>
          <div>{`User ID: ${user.id}`}</div>
          <div>{`First Name: ${user.first_name}`}</div>
          <div>{`Last Name: ${user.last_name}`}</div>
          <div>{`Email: ${user.email}`}</div>
          <div>{`Admin: ${user.is_admin}`}</div>
        </div>
      </div>
    </>
  );
};
export default User;
