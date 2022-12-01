import React, { useState } from "react";
import { register } from "../../api";
import { useNavigate } from "react-router-dom";


const Register = ({setNavGreeting}) => {
  let navigate = useNavigate()
  const [registerMessage, setRegisterMessage] = useState("Register here!");
  const [registerInfo, setRegisterInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  //useState would be way nicer than the event.target[].value

  async function handleSubmit(event) {
    event.preventDefault();
    const first_name = event.target[0].value;
    const last_name = event.target[1].value;
    const email = event.target[2].value;
    const password = event.target[3].value;
    const registeredUser = await register(
      first_name,
      last_name,
      email,
      password
    );

    if (!registeredUser.error) {
      localStorage.removeItem("userId");
      localStorage.removeItem("first_name");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("token");
      localStorage.setItem("userId", registeredUser.user.id);
      localStorage.setItem("first_name", registeredUser.user.first_name);
      localStorage.setItem("isAdmin", registeredUser.user.is_admin);
      localStorage.setItem("token", registeredUser.token);
      setNavGreeting(registeredUser.message)
      navigate("/")
      // setRegisterInfo({
      //   first_name: "",
      //   last_name: "",
      //   email: "",
      //   password: "",
      // });
    } else {
      setRegisterMessage(registeredUser.message);
    }
  }

  return (
    <>
      <div className="Register">
        <h3>{registerMessage}</h3>
        <form onSubmit={handleSubmit}>
          <label>First Name:</label>
          <input htmlFor="first_name" placeholder="First Name" required></input>
          <label>Last Name:</label>
          <input htmlFor="last_name" placeholder="Last Name" required></input>
          <label>Email:</label>
          <input htmlFor="email" placeholder="Email" required></input>
          <label>Password:</label>
          <input
            htmlFor="password"
            type="password"
            placeholder="Password"
            required
          ></input>
          <button className="registerButton" type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
};
export default Register;
