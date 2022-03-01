import React, {useState} from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function EditModal({ handleClose, userId }) {

    const [users, setUsers] = React.useState([]);
    const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

    const UserList = async () => {
        const response = await axios.get(`http://localhost:1337/api/user-accounts/${userId}`);
        setUsers(response.data);
      };
     
      const UpdateDetails = () => {

      }
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
                    <input type="text" className="form-control" id="name" defaultValue={users.name} onChange={(e)=>{setName(e.target.value)}}/>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" defaultValue={users.username} onChange={(e)=>{setUsername(e.target.value)}} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      defaultValue={users.email}
                      onChange={(e)=>{setEmail(e.target.value)}}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type = "submit" onClick={UpdateDetails}>Update</Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </div>
  );
}

export default EditModal;
