import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import validate from '../validations/validate';

function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit=(e)=>{
      e.preventDefault();
      const data = {email, password, errors};
      const values = {email, password};
      const validationErrors = validate(data);
      const noErrors = Object.keys(validationErrors).length === 0;
      setErrors(validationErrors);
      if(noErrors){
        console.log("User logged in " + data)
      }else{
        console.log("Errors", validationErrors)
      }
      const graphql = {
        query: `mutation loginUserLogin($email: String, $password: String) {
          loginUserLogin(data: {
            email: $email,
            password: $password
          }) {
            data {
              id,
              identifier {
                email,
                password
              }
            }
          }
        }
        `,
        variables:{
          email: values.email,
          password: values.password
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
          if (resData.errors) {
            alert("User not found.")
            throw new Error("Validation Failed. User not found!");
          }
          console.log(resData)
          
          // const token = resData.data.login.jwt;
          //  globalActions.addToken(token);
          alert(
            "User with username " +
              resData.data.loginUserLogin.data.attributes.email +
              " has logged in"
          );
          
        })
        .catch((err) => {
          console.log(err);
        });
    }

  return (
    <div>
         <div className="bg-img"></div>
      <div className="form-container login">
        <h1 className="title">Login</h1>
        <div className="registration-form row">
          <div className="col-md-12">
            <form onSubmit={handleSubmit} className="container">
            <div className="input-error">{errors.inputs}</div>
              <div className="mb-3">
                <label className="form-label">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  id="email"
                />
                <div className="input-error">{errors.email}</div>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Password
                </label>
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
              <button type="submit" className="btn btn-danger" onClick={handleSubmit}>
                Login
              </button>
              <div className="container signin">
                <p>
                  Don't have an account? <Link to="/">Sign Up</Link>.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin