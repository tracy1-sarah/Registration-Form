import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import validate from "../validations/validate";


function Home() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, username, password, email, errors };
    const validationErrors = validate(data);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      console.log("Authenticated", data);
    } else {
      console.log("Errors", validationErrors);
    }

    axios
      .post("https://jsonplaceholder.typicode.com/users", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div>
      <div className="img"></div>
      <div className="form-container">
        <h1 className="title">Registration Form</h1>
        <div className="registration-form row">
          <div className="col-md-12">
            <form onSubmit={handleSubmit} className="container">
            <div className="input-error">{errors.inputs}</div>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  id="name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  id="username"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  className="form-control"
                  id="password"
                />
                <div className="input-error">{errors.password}</div>
              </div>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                />
                <div className="input-error">{errors.email}</div>
              </div>

              <button
                type="submit"
                className="btn btn-danger"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <div className="container signin">
                <p>
                  Already have an account? <Link to="signin">Sign in</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
