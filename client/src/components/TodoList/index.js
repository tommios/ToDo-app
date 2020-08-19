import React from "react";
import Item from "./Item";
import { Grid, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  marginAdd: {
    textAlign: "center",
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    margin: theme.spacing(2),
  },
  fixed: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(6),
  },
  relative: {
    textAlign: "center",
  },
  completed: {
    opacity: 0.4,
  },
}));

const TodosList = ({ todos, onDelete, onUpdate }) => {
  const classes = useStyles();
  return (
    <Grid container justify="flex-start" spacing={2}>
      {todos.map((todo) => (
        <Grid
          key={todo._id}
          item
          xs={6}
          component="article"
          className={todo.completed ? classes.completed : ""}
        >
          <Item
            todo={todo}
            onDelete={onDelete}
            onUpdate={(data) => onUpdate(todo._id, data)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

const List = (props) => {
  const { todos, onDelete, onUpdate } = props;
  const classes = useStyles();

  return (
    <>
      <Link to="/todos/new">
        <Fab color="secondary" className={classes.fixed}>
          <AddIcon />
        </Fab>
      </Link>
      <h1>Incompleted:</h1>
      <TodosList
        todos={todos.filter((todo) => !todo.completed)}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
      <h1>Completed:</h1>
      <TodosList
        todos={todos.filter((todo) => !!todo.completed)}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </>
  );
};

export default List;
