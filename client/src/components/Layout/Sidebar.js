import React from "react";
import { Paper, Avatar, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NotesOutlinedIcon from "@material-ui/icons/NotesOutlined";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

const Sidebar = () => {
  const useStyles = makeStyles((theme) => ({
    userInfo: {
      height: "auto",
      padding: theme.spacing(2),
      textAlign: "center",
      backgroundColor: "#ffffff",
    },
    avatar: {
      margin: "auto",
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));

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
