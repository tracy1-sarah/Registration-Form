import React, {useState} from "react";

function Home() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    
    const submit = (e)=>{
        e.preventDefault();
        const data = {name, username,password,email};
        console.log("data", data);
    }

// /api/registers

  return (
    <div>
        <div className="img"></div> 
        <div className="form-container">
          <h1 className="title">Registration Form</h1>
          <div className="registration-form row">
            {/* <div className="col-md-3" /> */}
            <div className="col-md-12">
              <form onSubmit={submit} className="container">
                <div className="mb-3">
                  <label for="name" className="form-label">
                    Name
                  </label>
                  <input
                  value={name}
                  onChange={(e)=>{setName(e.target.value)}}
                    type="text"
                    className="form-control"
                    id="name"
                  />
                </div>
                <div className="mb-3">
                  <label for="username" className="form-label">
                    Username
                  </label>
                  <input
                  value={username}
                  onChange={(e)=>{setUsername(e.target.value)}}
                    type="text"
                    className="form-control"
                    id="username"
                  />
                </div>
               
                <div className="mb-3">
                  <label for="password" className="form-label">
                    Password
                  </label>
                  <input
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                    type="password"
                    className="form-control"
                    id="password"
                  />
                </div>
                <div className="mb-3">
                  <label for="email" className="form-label">
                    Email address
                  </label>
                  <input
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                  />
                </div>

                <button type="submit" className="btn btn-danger" onClick={submit}>
                  Submit
                  </button>
              </form>
            </div>
            {/* <div className="col-md-3" /> */}
          </div>
        </div>
    </div>
  );
}

export default Home;
