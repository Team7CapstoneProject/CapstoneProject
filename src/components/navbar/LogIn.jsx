import React, { useState } from "react";
import { logInUser } from "../../api";
import { Link, useNavigate } from "react-router-dom";

const LogIn = ({setNavGreeting}) => {
  const navigate = useNavigate();
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
      throw error;
      // replace above with corresponding error message
    } else {
      const token = registeredUser.token;
      localStorage.removeItem("userId");
      localStorage.removeItem("first_name");
      localStorage.removeItem("email");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("token");
      localStorage.setItem("userId", registeredUser.user.id);
      localStorage.setItem("first_name", registeredUser.user.first_name);
      localStorage.setItem("email", email);
      localStorage.setItem("isAdmin", registeredUser.user.is_admin);
      localStorage.setItem("token", token);

      setNavGreeting(registeredUser.message)
      navigate("/");

      setLogInInfo({ email: "", password: "" });
    }
  };

  return (
    <>
      <h3>Log in here!</h3>
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
