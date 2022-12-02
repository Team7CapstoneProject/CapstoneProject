import React, { useState } from "react";
import { User } from "../";

const Users = ({
  allUsers,
  setAllUsers,
  displayUsers,
  setDisplayUsers,
  setDisplayCreateProduct,
  setDisplayAdminProducts,
}) => {
  // const [displayUsers, setDisplayUsers] = useState(false);

  function handleClickSeeAllUsers(event) {
    if (!displayUsers) {
      event.preventDefault();
      setDisplayUsers(true);
      setDisplayCreateProduct(false);
      setDisplayAdminProducts(false);
    } else {
      setDisplayUsers(false);
    }
  }

  return (
    <>
      <div>
        <button onClick={handleClickSeeAllUsers} className="adminButton">
          See All Users
        </button>

        <div>
          {displayUsers ? (
            <div className="userList">
              {allUsers.length ? (
                allUsers.map((user) => {
                  return (
                    <User
                      key={`user-${user.id}`}
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
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default Users;
