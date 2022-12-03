import React from "react";
import "./CSS/navbar.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logInUser } from "../../api";

const Navbar = ({ navGreeting, setNavGreeting, userAccount }) => {
  const navigate = useNavigate();

  //------Log out function------
  function onClickLogOut(event) {
    event.preventDefault();
    localStorage.removeItem("userId");
    localStorage.removeItem("first_name");
    localStorage.removeItem("email");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
    setNavGreeting("");
    navigate("/");
  }

  const isAdmin = localStorage.getItem("first_name");

  async function onClickGuestSignIn() {
    let guest = await logInUser("guestuser", "guestuser");
    localStorage.setItem("first_name", guest.user.first_name);
    localStorage.setItem("token", guest.token);
    setNavGreeting(guest.message);
    navigate("/");
  }

  return (
    <>
      <div id="navbar">
        <Link to={"/"} className="logoLink">
          <img
            src="https://i.imgur.com/pW8C9X6.png"
            alt="GuitarStop"
            className="logo"
          />
        </Link>

        <div className="navButtonGroup">
          <div>
            <h3 className="navGreeting">{navGreeting}</h3>
          </div>

          <Link to={"/products"}>
            <button className="navButton">Products</button>
          </Link>
          <Link to={"/cart"}>
            <button className="navButton">Cart</button>
          </Link>

          <div>
            {isAdmin === "admin" ? (
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
            {!localStorage.getItem("token") ||
            (localStorage.getItem("token") &&
              localStorage.getItem("first_name") === "Guest") ? (
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
            <div>
              {(localStorage.getItem("token") &&
                localStorage.getItem("first_name") !== "Guest") ||
              localStorage.getItem("first_name") === "Guest" ? (
                <></>
              ) : (
                <div>
                  <button className="navButton" onClick={onClickGuestSignIn}>
                    Sign In As Guest
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
