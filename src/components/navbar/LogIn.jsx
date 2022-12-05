import React, { useState } from "react";
import { logInUser } from "../../api";
import { Link, useNavigate } from "react-router-dom";

const LogIn = ({ setNavGreeting, setUserAccount }) => {
  const navigate = useNavigate();
  const[loginMessage, setLoginMessage] = useState("Welcome Back")
  const [logInInfo, setLogInInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setLogInInfo({ ...logInInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    localStorage.removeItem("cart");
    localStorage.removeItem("token");

    const { email, password } = logInInfo;

    //This prevents people from physically typing themselves into the guest account. Going into the guestuser account should only be allowable when clicking the "sign in as guest" button.
    if (email === "guestuser") {
      return;
    }

    const registeredUser = await logInUser(email, password);

    if (registeredUser.error) {
      setLoginMessage(registeredUser.message);
    } else {
      localStorage.setItem("token", registeredUser.token);

      //Set multiple useStates
      setNavGreeting(registeredUser.message);
      setUserAccount(registeredUser.user);

      //Return to home
      navigate("/");

      setLogInInfo({ email: "", password: "" });
    }
  };

  return (
    <>
      <div className="headDiv">
        <h3 className="subHeader">{loginMessage}</h3>
        <div className="formDiv">
          <form onSubmit={handleSubmit} className="form">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              className="input"
              required
            />
            <br />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="input"
              required
            />
            <br />
            <button type="submit" className="submitButton">
              Submit
            </button>
          </form>
        </div>
        <p className="registerHereP">
          Don't have a GuitarStop account?
          <Link to="/register">
            <span className="registerHere">Sign up.</span>
          </Link>
        </p>
      </div>
    </>
  );
};
export default LogIn;
