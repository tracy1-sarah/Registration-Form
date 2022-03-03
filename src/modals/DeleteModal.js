import React, { useState } from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DeleteModal({ handleClose, userId }) {
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
  };

  const DeleteDetails = () => {
    const data = {
      name: name,
      username: username,
    };
    axios
      .delete(`http://localhost:1337/api/user-accounts/${userId}`, {
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
  },[]);

   // Snackbar

   const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
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
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this field?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type="submit" onClick={DeleteDetails}>Delete</Button>
        <Snackbar open={open} autoHideDuration={8000} onClose={handleClosed} anchorOrigin={{ vertical, horizontal }}>
          <Alert
            onClose={handleClosed}
            severity="success"
            sx={{ width: "100%" }}
          >
            Deleted successfully!
          </Alert>
        </Snackbar>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </div>
  );
}

export default DeleteModal;
