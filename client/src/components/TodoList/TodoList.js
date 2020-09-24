import React from "react";
import {Link} from "react-router-dom";
import Item from "./Item";
import {Grid, Fab} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./style";

const TodosList = ({title, todos, onDelete, onUpdate}) => {
    const classes = useStyles();
    if (todos.length === 0) {
        title = ""
    }

    return (
        <Grid container justify="flex-start" spacing={2}>
            <Grid
                key={title}
                item
                xs={12}
                component="h1"
            >
                {title}
            </Grid>

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
    const {todos, onDelete, onUpdate} = props;

    const classes = useStyles();

    return (
        <>
            <Link to="/todos/new">
                <Fab color="secondary" className={classes.fixed}>
                    <AddIcon/>
                </Fab>
            </Link>

            <TodosList
                title="Uncompleted"
                todos={todos.filter((todo) => !todo.completed)}
                onDelete={onDelete}
                onUpdate={onUpdate}
            />

            <TodosList
                title="Completed"
                todos={todos.filter((todo) => !!todo.completed)}
                onDelete={onDelete}
                onUpdate={onUpdate}
            />
        </>
    );
};

export default List;
