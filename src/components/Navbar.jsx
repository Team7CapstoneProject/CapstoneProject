import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  function onClickLogOut(event) {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("first_name");
    navigate("/");
  }

  const firstName = localStorage.getItem("first_name");
  return (
    <>
      <div id="navbar">
        <Link to={"/"} className="logo">
          <h2>GuitarStop</h2>
        </Link>

        <Link to={"/products"}>
          <button>Products</button>
        </Link>
        <Link to={"/cart"}>
          <button>Cart</button>
        </Link>

        <div>
          <Link to={"/admin"}>
            <button>Admin Dashboard</button>
          </Link>
        </div>

        <div>
          {!localStorage.getItem("token") ? (
            <div>
              <Link to={"/login"}>
                <button>Login</button>
              </Link>
              <Link to={"/register"}>
                <button>Register</button>
              </Link>
            </div>
          ) : (
            <div>
              <button onClick={onClickLogOut}>Log Out</button>
            </div>
          )}
        </div>

        <div>{firstName ? <div className="logo">{`Hello ${firstName}!`}</div> : <></>}</div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
