import React, { useState } from "react";
import { logInUser } from "../api";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  const [logInMessage, setLogInMessage] = useState("Login Below");
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
    console.log(registeredUser, "this is registeredUser");

    if (registeredUser.error) {
      throw error;
      // replace above with corresponding error message
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("userId");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("first_name");
      localStorage.setItem("token", registeredUser.token);
      localStorage.setItem("email", registeredUser.user.email);
      localStorage.setItem("userId", registeredUser.user.id);
      localStorage.setItem("isAdmin", registeredUser.user.is_admin);
      localStorage.setItem("first_name", registeredUser.user.first_name);
      setLogInMessage(`Welcome back ${registeredUser.user.first_name}!`);
      navigate("/");

      setLogInInfo({ email: "", password: "" });
    }
  };

  return (
    <>
      <h3>{logInMessage}</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">email:</label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            required
          />{" "}
          <br></br>
          <label htmlFor="password">password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />{" "}
          <br></br>
          <button type="submit">submit</button>
        </form>{" "}
      </div>
      <div>
        <Link to="/register">
          {" "}
          <button>Not registered? Create account here.</button>{" "}
        </Link>
      </div>
    </>
  );
};
export default LogIn;
