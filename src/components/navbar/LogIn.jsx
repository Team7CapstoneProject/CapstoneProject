import React, { useState } from "react";
import { logInUser, register } from "../../api";
import { Link, useNavigate } from "react-router-dom";

const LogIn = ({ setNavGreeting, setUserAccount }) => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [logInInfo, setLogInInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setLogInInfo({ ...logInInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = logInInfo;
    const registeredUser = await logInUser(email, password);

    if (registeredUser.error) {
      const message = registeredUser.message;
      setLoginError(message);
    } else {
      const token = registeredUser.token;
      localStorage.removeItem("first_name");
      localStorage.removeItem("token");
      localStorage.setItem("first_name", registeredUser.user.first_name);
      localStorage.setItem("token", token);

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
        <h3 className="subHeader">Welcome back</h3>
        {loginError ? (
          <div id="loginErrorMessage">{`${loginError}`}</div>
        ) : null}
        <div className="formDiv">
          <form onSubmit={handleSubmit} className="form">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              className="input"
              required
            />{" "}
            <br />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="input"
              required
            />{" "}
            <br />
            <button type="submit" className="submitButton">
              Submit
            </button>
          </form>{" "}
        </div>
        <p className="registerHereP">
          Don't have a GuitarStop account?
          <Link to="/register">
            {" "}
            <span className="registerHere">Sign up.</span>{" "}
          </Link>
        </p>
      </div>
    </>
  );
};
export default LogIn;
