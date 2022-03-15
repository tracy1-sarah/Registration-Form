import React, { useState } from "react";
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
    const values = { name, username, password, email };
    const data = { name, username, password, email, errors };
    const validationErrors = validate(data);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      console.log("Authenticated", data);
    } else {
      console.log("Errors", validationErrors);
    }

    const graphql = {
      query: `mutation createUserAccount($name: String, $username: String, $password: String, $email: String) {
        createUserAccount(data: {
          name: $name, 
          username: $username,
          password: $password,
          email: $email
        }) {
          data {
            id,
            attributes {
              name,
              email,
              password,
              username
            }
          }
        }
      }
      `,
      variables: {
        name: values.name,
        username: values.username,
        password: values.password,
        email: values.email,
      },
    };
    fetch("http://localhost:1337/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphql),
    })
      .then((res) => {
        return res.json();
      })

      .then((resData) => {
        if (resData.errors && resData.errors[0].status === 422) {
          throw new Error("Validation Failed. Username has been used");
        }
        if (resData.errors) {
          console.log(resData.errors);
          throw new Error("Cannot create User");
        }
        console.log(resData);
        alert(
          "User with username " +
            resData.data.createUserAccount.data.attributes.username +
            " has been created"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <button type="submit" className="btn btn-primary btn-user">
          <Link className="link" to="dashboard">
            View Users
          </Link>
        </button>
      </div>
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
                <label className="form-label">Email Address</label>
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
