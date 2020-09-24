import React, {useEffect, useState} from "react";
import {useLocation, useParams, useHistory} from "react-router-dom";
import {Container, CssBaseline} from "@material-ui/core";
import TodoForm from "../components/forms/TodoForm/TodoForm";
import TodoView from "../components/TodoView/TodoView";
import {todoGetOne, todoUpdate} from "../store/todos/actions";
import {useDispatch, useSelector} from "react-redux";

const Todo = (props) => {
    const {id} = useParams();
    const location = useLocation();
    const {isEdit} = location;
    const dispatch = useDispatch();
    const history = useHistory();
    const todo = useSelector((state) => state?.todos?.todo || {});
    const [editMode, setEditMode] = useState(isEdit);

    useEffect(() => {
        if (id) {
            dispatch(todoGetOne(id));
        }
    }, [id, dispatch]);

    const handleUpdate = (data) => {
        dispatch(todoUpdate(id, data));
        setEditMode(false);
    };

    if (!todo) {
        return <h1>Loading...</h1>;
    }

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline/>
            {editMode && id ? (
                <TodoForm
                    formData={{...todo}}
                    onSubmit={handleUpdate}
                    // onCancel={() => setEditMode(false)}
                    onCancel={() => history.replace("/todos")}

                />
            ) : (
                <TodoView todo={{...todo}} onEdit={() => setEditMode(true)}/>
            )}
        </Container>
    );
};

export default Todo;
