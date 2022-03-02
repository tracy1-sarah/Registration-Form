import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import EditModal from "../modals/EditModal";
import DeleteModal from "../modals/DeleteModal";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Dialog from "@mui/material/Dialog";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;
  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function UserDetails() {
  const [users, setUsers] = useState({ data: [] });
  const [userId, setUserId] = React.useState();

  const UserList = async () => {
    const response = await axios.get("http://localhost:1337/api/user-accounts");
    setUsers(response.data);
  };

  useEffect(() => {
    UserList();
  }, []);


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users?.data?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //Edit modal
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Delete Modal
  const handleClickOpened = () => {
    setOpens(true);
  };

  const handleClosed = () => {
    setOpens(false);
  };

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
                  {
                    <EditIcon
                      className="icons"
                      list={list}
                      onClick={() => {
                        handleClickOpen();
                        setUserId(list?.id);
                      }}
                      style={{ color: "#6FD92E", cursor: "pointer" }}
                    />
                  }

                  {
                    <DeleteOutlineIcon
                      className="icons"
                      onClick={() => {
                        handleClickOpened();
                      }}
                      style={{ color: "#E61B10", cursor: "pointer" }}
                    />
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                className="paginate"
                colSpan={3}
                count={users?.data?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {/* Edit and Delete Modal  */}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <EditModal handleClose={handleClose} userId={userId} />
      </Dialog>
      <Dialog open={opens} onClose={handleClosed} maxWidth="xs" fullWidth>
        <DeleteModal handleClose={handleClosed} userId={userId} />
      </Dialog>
    </div>
  );
}

export default UserDetails;
