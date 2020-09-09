import React, {useEffect} from "react";
import {BrowserRouter as Router, Route, Switch, Redirect, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import Todos from "./pages/Todos";
import Todo from "./pages/Todo";
import NewTodo from "./pages/NewTodo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from "@material-ui/core/Container";
import {useSelector} from "react-redux";
import {init} from "./store/auth/actions";
import {getQuery} from '@redux-requests/core';
import {SET_CURRENT_USER} from "./store/auth/types";


// todo move to configs
function PrivateRoute({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>}
        />
    )
}

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(init())
    }, [dispatch])

    const isResponse = useSelector((state) => getQuery(state, {type: SET_CURRENT_USER}));
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (isResponse.loading || isResponse.pristine) {
        return (
            <CircularProgress/>
        )
    } else {

        return (
            <Container>
                <Router>
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/signup" component={Signup}/>
                        <PrivateRoute authed={isAuthenticated} exact path="/" component={Todos}/>
                        <PrivateRoute authed={isAuthenticated} exact path="/todos" component={Todos}/>
                        <PrivateRoute authed={isAuthenticated} exact path="/todos/new" component={NewTodo}/>
                        <PrivateRoute authed={isAuthenticated} exact path="/todos/:id" component={Todo}/>
                    </Switch>
                </Router>
            </Container>
        );
    }
}

export default App;
