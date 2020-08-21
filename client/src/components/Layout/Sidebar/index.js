import React from "react";
import { Paper, Avatar, Box, Button } from "@material-ui/core";
import NotesOutlinedIcon from "@material-ui/icons/NotesOutlined";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import useStyles from "./style";

const Sidebar = () => {
  const classes = useStyles();

  return (
    <>
      <Avatar alt="user-avatar" src="" className={classes.avatar} />
      <Paper className={classes.userInfo}>User Name</Paper>
      <hr />
      <Box m={2}>
        <Button startIcon={<NotesOutlinedIcon />}>Todo</Button>
      </Box>
      <Box m={2}>
        <Button startIcon={<AccountBoxOutlinedIcon />}>Account</Button>
      </Box>
      <Box m={2}>
        <Button startIcon={<ExitToAppOutlinedIcon />}>Logout</Button>
      </Box>
    </>
  );
};

export default Sidebar;
