import React, {useEffect, useState} from "react";
import TodoList from "../../components/TodoList";
import Sidebar from "../../components/Layout/Sidebar";
import {
    Grid,
    Paper,
    TextField,
    FormControl,
    InputLabel,
    Select
} from "@material-ui/core";
import useStyles from "./style";
import {
    todoGetAll,
    todoDeleteOne,
    todoUpdate,
} from "../../store/todos/actions";
import {useDispatch, useSelector} from "react-redux";


const options = [
    {value: false, label: "Uncompleted"},
    {value: true, label: "Completed"},
];

let searchTimer;

const ItemList = (props) => {
    const todos = useSelector((state) => state?.todos?.todos || []);
    const [searchString, setSearchString] = useState("");
    const [select, setSelect] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
            dispatch(todoGetAll({search: searchString, completed: select}));
        }, 300);
        return () => {
            clearTimeout(searchTimer);
        };
    }, [dispatch, searchString, select]);

    const classes = useStyles();

    const handleDelete = (id) => {
        dispatch(todoDeleteOne(id));
    };

    const handleUpdate = (id, data) => {
        dispatch(todoUpdate(id, data));
    };

    const handleChangeCompletionFilter = (event) => {
        setSelect(event.target.value);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} component="header">
                <Paper className={classes.header}>Todo App</Paper>
            </Grid>

            <Grid item xs={3} component="aside">
                <Sidebar/>
            </Grid>

            <Grid item xs={9} component="section">
                <div className={classes.search}>
                    <form className={classes.form} noValidate>
                        <FormControl className={classes.formControlInput}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                required
                                autoComplete="searchString"
                                id="searchString"
                                label="Search"
                                name="searchString"
                                value={searchString}
                                onChange={(e) => setSearchString(e.target.value)}
                            />
                        </FormControl>

                        <FormControl
                            variant="outlined"
                            className={classes.formControlSelect}
                        >
                            <InputLabel>ALL</InputLabel>
                            <Select
                                native
                                value={select}
                                name={"completed"}
                                onChange={handleChangeCompletionFilter}
                                label="select"
                            >
                                <option aria-label="select" value=""/>
                                {options.map(({value, label}, i) => (
                                    <option name={label} value={value} key={i}>
                                        {label}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </form>
                </div>

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
