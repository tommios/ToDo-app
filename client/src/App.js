import React, {useEffect} from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
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


const AppRoute = props => {
    const {redirectTo} = props;
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return !!redirectTo && isAuthenticated ?
        <Redirect to="/" /> :
        <Route {...props} />
};


const PrivateRoute = ({component: Component, ...rest}) => {
    const isEmailValidate = useSelector((state) => state.auth.user.emailValidated);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return isAuthenticated ?
        <AppRoute {...rest} component={isEmailValidate ? Component : EmailValidate}/> :
        <Redirect to="/login" />
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
                    <AppRoute path="/login" redirectTo='/' component={Login}/>
                    <AppRoute path="/signup" redirectTo='/' component={Signup}/>
                    <AppRoute path="/reset" component={ResetPassword}/>
                    <AppRoute path="/password/:token" component={NewPassword}/>
                    <AppRoute path="/verify/:hash" component={EmailConfirm}/>
                    <PrivateRoute path="/" component={Todos} exact/>
                    <PrivateRoute path="/todos" component={Todos} exact/>
                    <PrivateRoute path="/todos/new" component={NewTodo} exact/>
                    <PrivateRoute path="/todos/:id" component={Todo} exact/>
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