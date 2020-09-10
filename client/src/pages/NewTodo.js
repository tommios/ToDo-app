import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
// import TodoForm from "../components/forms/TodoForm";
// import TodoForm from "../components/forms/FormikTodoForm/index";
import TodoForm from "../components/forms/FormikTodoForm/newForm";
import {Alert} from "@material-ui/lab";
import {todoCreate} from "../store/todos/actions";
import {useDispatch, useSelector} from "react-redux";

const NewTodo = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [error, setError] = useState();
    const userId = useSelector((state) => state.auth.user.id);

    const onSubmit = (data) => {
        setError(undefined);
        data = {...data, userId};
        console.log("NewTodo data ======> ", data);
        dispatch(todoCreate(data));

        history.push("/todos");
    };

    const onCancel = () => {
        history.push("/todos");
    };

    return (
        <>
            <Link
                to={{
                    pathname: "/",
                }}
                className="btn"
            >
                Back
            </Link>
            {!!error && <Alert severity="error">{error}</Alert>}
            <TodoForm onSubmit={onSubmit} onCancel={onCancel}/>
        </>
    );
};

export default NewTodo;
