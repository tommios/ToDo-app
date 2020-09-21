import React, {useEffect} from "react";
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import Todos from "./pages/Todos";
import Todo from "./pages/Todo";
import NewTodo from "./pages/NewTodo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import NewPassword from "./pages/NewPassword"
import EmailValidate from "./pages/EmailValidate";
import EmailConfirm from "./pages/EmailConfirm"
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from "@material-ui/core/Container";
import {useSelector} from "react-redux";
import {init} from "./store/auth/actions";
import {getQuery} from '@redux-requests/core';
import {SET_CURRENT_USER} from "./store/auth/types";

const AppRoute = props => <Route exact {...props} />;

const PrivateRoute = ({component: Component, ...props}) => {
    const history = useHistory();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isEmailValidate = useSelector((state) => state.auth.user.emailValidated);

    if (!isAuthenticated) return history.push('/login');

    return <AppRoute {...props} component={isEmailValidate ? Component : EmailValidate}/>;
}


const App = () => {
    const dispatch = useDispatch();
    const isResponse = useSelector((state) => getQuery(state, {type: SET_CURRENT_USER}));
    const isLoading = isResponse.loading || isResponse.pristine;

    useEffect(() => {
        dispatch(init())
    }, [dispatch])

    return !isLoading ? (
        <Container>
            <Router>
                <Switch>
                    <AppRoute path="/login" component={Login}/>
                    <AppRoute path="/signup" component={Signup}/>
                    <AppRoute path="/reset" component={ResetPassword}/>
                    <AppRoute path="/password/:token" component={NewPassword}/>
                    <AppRoute path="/verify/:hash" component={EmailConfirm}/>
                    <PrivateRoute path="/" component={Todos}/>
                    <PrivateRoute path="/todos" component={Todos}/>
                    <PrivateRoute path="/todos/new" component={NewTodo}/>
                    <PrivateRoute path="/todos/:id" component={Todo}/>
                </Switch>
            </Router>
        </Container>
    ) : (
        <div>
            <CircularProgress size={"10rem"} style={{margin: "5em 50em 5em"}}/>
        </div>
    )
}

export default App;