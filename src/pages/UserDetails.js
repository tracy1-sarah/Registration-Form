import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Dialog from '@mui/material/Dialog';
import EditModal from "../modals/EditModal";

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = React.useState()

  const UserList = async () => {
    const response = await axios.get("http://localhost:1337/api/user-accounts");
    setUsers(response.data);
  };

  useEffect(() => {
    UserList();
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(users);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>id</b>
              </TableCell>
              <TableCell align="left">
                <b>Name</b>
              </TableCell>
              <TableCell align="left">
                <b>Username</b>
              </TableCell>
              <TableCell align="left">
                <b>Email</b>
              </TableCell>
              <TableCell align="left">
                <b>Action</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.data?.map((list) => (
              <TableRow
                key={list.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{list?.id}</TableCell>
                <TableCell align="left">{list?.attributes.name}</TableCell>
                <TableCell align="left">{list?.attributes.username}</TableCell>
                <TableCell align="left">{list?.attributes.email}</TableCell>
                <TableCell className="icons" align="left">
                  {<EditIcon list = {list} onClick ={()=>{
                    
                    handleClickOpen()
                    setUserId(list?.id)
                      
                  }} style={{ color: "#E3C114", cursor: "pointer" }} />}
                  {<DeleteOutlineIcon style={{ color: "#FF1C12" , cursor: "pointer" }} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          className="paginate"
          count={users?.data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth 
      ><EditModal handleClose = {handleClose} userId={userId}/></Dialog>
    </div>
  );
}

export default UserDetails;
