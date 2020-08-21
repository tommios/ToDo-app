import React, { useState, useEffect } from "react";
import API from "../../api";
import TodoList from "../../components/TodoList";
import Sidebar from "../../components/Layout/Sidebar";
import { Grid, Paper } from "@material-ui/core";
import useStyles from "./style";
//import { fetchTodos } from "../../store/todos/actions";
import axiosTodo from "../../store/todos/actions";
import { useDispatch, useSelector } from "react-redux";

const ItemList = (props) => {
  const [todos, setTodos] = useState([]);
  const dispatch = useDispatch();

  //const todosFromStore = useSelector((state) => state.todos.items);

  const isLoading = useSelector((state) => state.todos.isLoading);

  // useEffect(() => {
  //   console.log(todosFromStore);
  // }, [todosFromStore]);

  useEffect(() => {
    API.todo.getAll().then((res) => {
      setTodos(res);
    });
  }, []);

  const classes = useStyles();

  const handleClick = () => {
    // const query = {
    //   limit: 20,
    //   offset: 0,
    // };
    // dispatch(fetchTodos(query));
    dispatch(axiosTodo());
  };

  const handleDelete = (id) => {
    return API.todo.remove(id).then(() => {
      let index = todos.findIndex((element) => id === element._id);

      //console.log(index);
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
        <button onClick={handleClick}>FETCH</button>
        {isLoading && "Loading..."}
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
