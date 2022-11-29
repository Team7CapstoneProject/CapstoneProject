import React from "react";
import { register } from '../api';

const Register = () => {

  async function handleSubmit(event) {
    event.preventDefault();
    const first_name = event.target[0].value;
    const last_name = event.target[1].value;
    const email = event.target[2].value;
    const password = event.target[3].value;
    const registerUser = await register(first_name, last_name, email, password);
    const token = registerUser.token;
    console.log(registerUser)
    console.log(token, "THIS IS THE TOKEN")
    if(token){
      console.log(`${first_name} user account created`)
    }else {
      console.log("failed :(")
    }
    localStorage.removeItem("token");
    localStorage.setItem("token", token);
  }


  return (
    <>
      <div className="Register">
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input htmlFor="first_name" placeholder="First Name" required></input>
        <label>Last Name:</label>
        <input htmlFor="last_name" placeholder="Last Name"required></input>
        <label>Email:</label>
        <input htmlFor="email" placeholder="Email" required></input>
        <label>Password:</label>
        <input htmlFor="password" placeholder="Password" required></input>
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      </div>
    </>
  );
};
export default Register;
