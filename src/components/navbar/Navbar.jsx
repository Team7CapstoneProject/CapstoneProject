import React from "react";
import "./CSS/navbar.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logInUser } from "../../api";

const Navbar = ({
  userAccount,
  setUserAccount,
  navGreeting,
  setNavGreeting,
}) => {
  //------Global constants------
  const navigate = useNavigate();
  const userName = userAccount.first_name
  const token = localStorage.getItem("token");

  //------Log out function------
  function onClickLogOut(event) {
    event.preventDefault();
    localStorage.removeItem("token");
    //setUserAccount to an empty object prevents admin dashboard button to show when logged out.
    setUserAccount({});
    setNavGreeting("");
    navigate("/");
  }

  //------Guest sign-in function------
  async function onClickGuestSignIn() {
    localStorage.removeItem("cart");
    localStorage.removeItem("token");
    let guest = await logInUser("guestuser", "guestuser");
    localStorage.setItem("token", guest.token);
    setNavGreeting("Welcome to GuitarStop!");
    navigate("/");
  }

  return (
    <>
      {/* ------------------ LOGO BUTTON ------------------ */}
      <div id="navbar">
        <Link to={"/"} className="logoLink">
          <img
            src="https://i.imgur.com/pW8C9X6.png"
            alt="GuitarStop"
            className="logo"
          />
        </Link>

        {/* ------------------ MY ACCOUNT BUTTON ------------------ */}
        <div className="navButtonGroup">
          <div>
            <h3 className="navGreeting">{navGreeting}</h3>
          </div>
          <div>
            {token && userName !== "Guest" ? (
              <div>
                <Link to={"/account"}>
                  <button className="navButton">My Account</button>
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>

          {/* ------------------ ADMIN DASHBOARD BUTTON ------------------ */}
          <div>
            {userAccount.is_admin === true ? (
              <div>
                <Link to={"/admin"}>
                  <button className="navButton">Admin Dashboard</button>
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>

          {/* ------------------ PRODUCTS BUTTON ------------------ */}
          <Link to={"/products"}>
            <button className="navButton">Products</button>
          </Link>

          {/* ------------------ CART BUTTON ------------------ */}
          <div>
            {token ? (
              <div>
                {" "}
                <Link to={"/cart"}>
                  <button className="navButton">Cart</button>
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>

          {/* ------------------ LOGIN, REGISTER, LOGOUT BUTTON ------------------ */}
          <div>
            {!token || (token && userName === "Guest") ? (
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

          {/* ------------------ SIGN IN AS GUEST BUTTON ------------------ */}
          <div>
            {(token && userName !== "Guest") || userName === "Guest" ? (
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
      <Outlet />
    </>
  );
};

export default Navbar;
