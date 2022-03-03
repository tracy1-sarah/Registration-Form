import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Typography } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EditModal({ handleClose, userId }) {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

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
      email: email,
    };
    axios
      .put(`http://localhost:1337/api/user-accounts/${userId}`, {
        data,
      })
      .then((res) => {
        setOpen(true);
        // handleClose();
        window.location.reload();
      });
  };
  React.useEffect(() => {
    UserList();
  }, []);

  // Snackbar
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal } = state;

  const SnackBarClick = () => {
    setOpen(true);
  };

  const handleClosed = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <DialogTitle>
        <Typography component="p" variant="h6" className="title">Edit Form</Typography>
      </DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button type="submit" onClick={UpdateDetails}>
          Update
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={8000}
          onClose={handleClosed}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert
            onClose={handleClosed}
            severity="success"
            sx={{ width: "100%" }}
          >
            Updated successfully!
          </Alert>
        </Snackbar>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </div>
  );
}

export default EditModal;
