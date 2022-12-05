import React, { useEffect, useState } from "react";
import { Users } from "../";

const UserSearch = ({
  token,
  allUsers,
  setAllUsers,
  displayUsers,
  setDisplayUsers,
  setDisplayCreateProduct,
  setDisplayAdminProducts,
}) => {
  //----------- SEARCH BAR FUNCTION ------------------
  const [users, setUsers] = useState(allUsers);

  useEffect(() => {
    setUsers(allUsers);
  }, [allUsers]);

  function searchUsers(searchValue) {
    if (searchValue !== "") {
      const filteredUsers = allUsers.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setUsers(filteredUsers);
    } else {
      setUsers(allUsers);
    }
  }

  const handleChange = (input) => {
    input.preventDefault();
    searchUsers(input.target.value);
  };



  return (
    <>
      <div className="productPage">
        <div>
  
        </div>
        {displayUsers ? (
          <div>
            <div>
              <form className="productSearchForm">
                <input
                  className="productSearchInput"
                  type="text"
                  placeholder="Search users"
                  onChange={handleChange}
                  autoFocus
                />
              </form>
            </div>
            <Users
              token={token}
              users={users}
              allUsers={allUsers}
              setAllUsers={setAllUsers}
              displayUsers={displayUsers}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default UserSearch;
