import React, { useState } from "react";
import { logInUser } from "../api";
import { Link } from "react-router-dom";

const LogIn = () => {
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

    console.log(logInInfo);
    const registeredUser = await logInUser(email, password);
    console.log(registeredUser);

    if (registeredUser.error) {
      throw error;
      // replace above with corresponding error message
    } else {
      const token = registeredUser.token;
      localStorage.removeItem("token");
      localStorage.setItem("token", token);
      localStorage.removeItem("email");
      localStorage.setItem("email", email);
      setLogInInfo({ email: "", password: "" });
    }
  };

  return (
    <>
      <h3>Login below</h3>
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
        <Link to="/users/register">
          {" "}
          <button>not registered? create account here.</button>{" "}
        </Link>
      </div>
    </>
  );
};
export default LogIn;
