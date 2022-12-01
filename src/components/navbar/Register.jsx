import React, { useState } from "react";
import { register } from "../../api";

const Register = () => {
  const [registerMessage, setRegisterMessage] = useState("Register here!");
  const [registerInfo, setRegisterInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  })
  //useState would be way nicer than the event.target[].value

  async function handleSubmit(event) {
    event.preventDefault();
    const first_name = event.target[0].value;
    const last_name = event.target[1].value;
    const email = event.target[2].value;
    const password = event.target[3].value;
    const registerUser = await register(first_name, last_name, email, password);
    const token = registerUser.token;
    console.log(registerUser);
    console.log(token, "THIS IS THE TOKEN");

    if (password.length < 8) {
      setRegisterMessage(`Password must 8 characters or more`);
    }
    if (token) {
      console.log(`${first_name}'s user account created`);
      setRegisterMessage(`Thanks ${first_name} for registering with us!`);
    } else {
      console.log("failed :(");
      setRegisterMessage(`Email account ${email} is already taken!`);
    }
    localStorage.removeItem("token");
    localStorage.setItem("token", token);
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
