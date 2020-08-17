import React, { useState, useEffect } from "react";
import API from "../api";
import { Item } from "../components/Item";
// import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Avatar, Box, Button } from "@material-ui/core";
import NotesOutlinedIcon from "@material-ui/icons/NotesOutlined";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

function ItemList(props) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    API.todo.getAll().then((res) => {
      // console.log(res);
      setTodos(res);
    });
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    header: {
      padding: theme.spacing(2),
      textAlign: "center",
      backgroundColor: "#ff5722",
    },
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
    control: {
      padding: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.header}>Todo App</Paper>
      </Grid>

      <Grid item xs={3}>
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
      </Grid>

      <Grid item xs={9}>
        <Grid container justify="flex-start" spacing={2}>
          {todos.map((todo) => (
            <Grid key={todo._id} item xs={6}>
              <Item todo={todo} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ItemList;
