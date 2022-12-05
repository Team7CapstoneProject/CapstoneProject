import React from "react";
import { User } from "../";

const Users = ({ token, users, allUsers, setAllUsers }) => {
  return (
    <>
      <div>
        <div>
          <div className="userList">
            {users.length ? (
              users.map((user) => {
                return (
                  <User
                    key={`user-${user.id}`}
                    token={token}
                    user={user}
                    allUsers={allUsers}
                    setAllUsers={setAllUsers}
                  />
                );
              })
            ) : (
              <div> No Users Found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Users;
