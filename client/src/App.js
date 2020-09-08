import React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {useDispatch} from "react-redux";
import Todos from "./pages/Todos";
import Todo from "./pages/Todo";
import NewTodo from "./pages/NewTodo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Container from "@material-ui/core/Container";
import {useSelector} from "react-redux";
import {init} from "./store/auth/actions";

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
    dispatch(init());

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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

                    {/*<Route exact path="/auth/password/:hash" component={Signup} />*/}
                    {/*<Route exact path="/auth/new-password" component={Signup} />*/}
                </Switch>
            </Router>
        </Container>
    );
}

export default App;
