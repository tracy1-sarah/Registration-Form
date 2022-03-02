import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



function EditModal({ handleClose, userId }) {
  const [users, setUsers] = React.useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const UserList = async () => {
    const response = await axios.get(
      `http://localhost:1337/api/user-accounts/${userId}`
    );
    setUsers(response.data.data.attributes);
    setName(response.data.data.attributes.name);
    setUsername(response.data.data.attributes.username);
    setEmail(response.data.data.attributes.email);
  };

  const UpdateDetails = () => {
    const data = {
      name: name,
      username: username,
      //   email:email,
    };
    axios
      .put(`http://localhost:1337/api/user-accounts/${userId}`, {
        data,
      })
      .then((res) => {
          handleClose();
          window.location.reload()
      });
  };
  React.useEffect(() => {
    UserList();
  }, []);

  return (
    <div>
      <DialogTitle>
        <h1 className="title">Edit Form</h1>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div className="dialog-container">
            <div className="registration-form row">
              <div className="col-md-12">
                <form className="container" onSubmit={UpdateDetails}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      value={username}
                      className="form-control"
                      id="username"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      aria-describedby="emailHelp"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type="submit" onClick={UpdateDetails}>

          Update
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </div>
  );
}

export default EditModal;
