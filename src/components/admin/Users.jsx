import React from "react";
import { User } from "../";

const Users = ({
  allUsers,
  setAllUsers,
  displayUsers,
  setDisplayUsers,
  setDisplayCreateProduct,
  setDisplayAdminProducts,
}) => {

  function handleClickSeeAllUsers(event) {
    event.preventDefault();
    if (!displayUsers) {
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
