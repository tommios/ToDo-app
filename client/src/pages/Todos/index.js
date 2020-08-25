import React, { useEffect } from "react";
//import API from "../../api";
import TodoList from "../../components/TodoList";
import Sidebar from "../../components/Layout/Sidebar";
import { Grid, Paper } from "@material-ui/core";
import useStyles from "./style";
import {
  todoGetAll,
  todoDeleteOne,
  todoUpdate,
} from "../../store/todos/actions";
import { useDispatch, useSelector } from "react-redux";

const ItemList = (props) => {
  //const todosFromStore = useSelector((state) => state.todos.items);

  const todos = useSelector((state) => state?.todos?.todos || []);
  const isLoading = useSelector((state) => state.todos.isLoading);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(todosFromStore);
  // }, [todosFromStore]);

  useEffect(() => {
    // API.todo.getAll().then((res) => {
    //   setTodos(res);
    // });
    dispatch(todoGetAll());
  }, [dispatch]);

  const classes = useStyles();

  const handleClick = () => {
    dispatch(todoGetAll());
  };

  const handleDelete = async (id) => {
    await dispatch(todoDeleteOne(id));
    // return API.todo.remove(id).then(() => {
    //   let index = todos.findIndex((element) => id === element._id);
    //   //console.log(index);
    //   if (index === -1) {
    //     return;
    //   }
    //   todos.splice(index, 1);
    //   setTodos([...todos]);
    // });
    await dispatch(todoGetAll());
  };

  const handleUpdate = async (id, data) => {
    await dispatch(todoUpdate(id, data));
    await dispatch(todoGetAll());
    // return API.todo.update(id, data).then((todo) => {
    //   let index = todos.findIndex((element) => id === element._id);
    //   if (index === -1) {
    //     return;
    //   }
    //   todos.splice(index, 1, todo);
    //   setTodos([...todos]);
    // });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} component="header">
        <Paper className={classes.header}>Todo App</Paper>
        <button onClick={handleClick}>Get All</button>
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
