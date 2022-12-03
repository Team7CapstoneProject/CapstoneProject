import React, { useState } from "react";
import { register } from "../../api";
import { useNavigate } from "react-router-dom";

const Register = ({ setNavGreeting }) => {
  let navigate = useNavigate();
  const [registerMessage, setRegisterMessage] = useState("Create your account");
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
      localStorage.removeItem("first_name");
      localStorage.removeItem("token");
      localStorage.setItem("first_name", registeredUser.user.first_name);
      localStorage.setItem("token", registeredUser.token);
      setNavGreeting(registeredUser.message);
      navigate("/");
    } else {
      setRegisterMessage(registeredUser.message);
    }
  }

  return (
    <>
      <div className="headDiv">
        <h3 className="subHeader">{registerMessage}</h3>
        <div className="formDiv">
          <form onSubmit={handleSubmit} className="form">
            <label>First Name</label>
            <input htmlFor="first_name" className="input" required></input>{" "}
            <br />
            <label>Last Name</label>
            <input htmlFor="last_name" className="input" required></input>{" "}
            <br />
            <label>Email</label>
            <input htmlFor="email" className="input" required></input> <br />
            <label>Password</label>
            <input
              htmlFor="password"
              className="input"
              type="password"
              required
            ></input>{" "}
            <br />
            <button className="submitButton" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Register;
