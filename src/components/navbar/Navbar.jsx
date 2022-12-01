import React from "react";
import "./CSS/navbar.css";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  function onClickLogOut(event) {
    event.preventDefault();
    localStorage.removeItem("userId");
    localStorage.removeItem("first_name");
    localStorage.removeItem("email");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
    navigate("/");
  }

  const firstName = localStorage.getItem("first_name");
  const isAdmin = localStorage.getItem("isAdmin");

  return (
    <>
      <div id="navbar">
        <Link to={"/"} className="logoLink">
          <h1 className="logo">GuitarStop</h1>
        </Link>

        <div className="navButtonGroup">
          <Link to={"/products"}>
            <button className="navButton">Products</button>
          </Link>
          <Link to={"/cart"}>
            <button className="navButton">Cart</button>
          </Link>

          <div>
            {isAdmin === "true" ? (
              <div>
                <Link to={"/admin"}>
                  <button className="navButton">Admin Dashboard</button>
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>

          <div>
            {!localStorage.getItem("token") ? (
              <div>
                <Link to={"/login"}>
                  <button className="navButton">Login</button>
                </Link>
                <Link to={"/register"}>
                  <button className="navButton">Register</button>
                </Link>
              </div>
            ) : (
              <div>
                <button onClick={onClickLogOut} className="navButton">
                  Log Out
                </button>
              </div>
            )}
          </div>

          <div>
            {firstName ? (
              <h3 className="navGreeting">{`Hello ${firstName}!`}</h3>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
