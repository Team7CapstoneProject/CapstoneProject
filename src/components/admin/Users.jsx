import React, { useState } from "react";
import { User } from "../";

const Users = ({ allUsers }) => {
  const [displayUsers, setDisplayUsers] = useState(false);

  function handleClickSeeAllUsers(event) {
    if (!displayUsers) {
      event.preventDefault();
      setDisplayUsers(true);
    } else {
      setDisplayUsers(false);
    }
  }

  return (
    <>
      <div>
        <button onClick={handleClickSeeAllUsers}>See All Users</button>

        <div>
          {displayUsers ? (
            <div>
              {allUsers.length ? (
                allUsers.map((user) => {
                  return <User key={`user-${user.id}`} user={user} />;
                })
              ) : (
                <div> No Users Found</div>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default Users;
