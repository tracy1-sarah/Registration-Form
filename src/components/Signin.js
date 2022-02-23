import React,{useState} from 'react'
import {Link} from 'react-router-dom'

function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

  return (
    <div>
         <div className="bg-img"></div>
      <div className="form-container login">
        <h1 className="title">Login</h1>
        <div className="registration-form row">
          <div className="col-md-12">
            <form className="container">
              <div className="mb-3">
                <label className="form-label">
                  Username
                </label>
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
              </div>
              <button type="submit" className="btn btn-danger">
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