import React from "react";
import { register } from '../api';

const Register = () => {




  return (
    <>
      <div>This is Register Component</div>
      <form>
        <label>First Name:</label>
        <input htmlFor></input>
        <label>Last Name:</label>
        <input></input>
        <label>Email:</label>
        <input></input>
        <label>Password:</label>
        <input></input>
        <button type="text">
          Register
        </button>
      </form>
    </>
  );
};
export default Register;
