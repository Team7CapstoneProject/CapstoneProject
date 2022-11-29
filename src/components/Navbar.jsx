import React from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div id="navbar">
        <Link to={"/"} className="logo">
          <h2>GuitarStop</h2>
        </Link>
        <Link to={"/login"}>
          <button>login</button>
        </Link>
        <Link to={"/register"}>
          <button>register</button>
        </Link>
        <Link to={"/cart"}>
          <button>cart</button>
        </Link>
        <Link to={"/products"}>
          <button>products</button>
        </Link>
        <Link to={"/admin"}>
          <button>admin dashboard</button>
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
