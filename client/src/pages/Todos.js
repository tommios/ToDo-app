import React, { useState, useEffect } from "react";
import API from "../api";
import TodoList from "../components/TodoList";
import Sidebar from "../components/Layout/Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

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

const ItemList = (props) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    API.todo.getAll().then((res) => {
      setTodos(res);
    });
  }, []);

  const classes = useStyles();

  const handleDelete = (id) => {
    return API.todo.remove(id).then(() => {
      let index = todos.findIndex((element) => id === element._id);

      console.log(index);
      if (index === -1) {
        return;
      }

      todos.splice(index, 1);
      setTodos([...todos]);
    });
  };

  const handleUpdate = (id, data) => {
    return API.todo.update(id, data).then((todo) => {
      let index = todos.findIndex((element) => id === element._id);
      if (index === -1) {
        return;
      }

      todos.splice(index, 1, todo);
      setTodos([...todos]);
    });
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} component="header">
        <Paper className={classes.header}>Todo App</Paper>
      </Grid>

      <Grid item xs={3} component="aside">
        <Sidebar />
      </Grid>

      <Grid item xs={9} component="section">
        <TodoList
          todos={todos}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </Grid>
    </Grid>
  );
};

export default ItemList;
