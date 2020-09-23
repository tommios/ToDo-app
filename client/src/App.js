import React, {useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import Todos from "./pages/Todos";
import Todo from "./pages/Todo";
import NewTodo from "./pages/NewTodo.js";
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
    return <Route exact {...props} />
};

const PrivateRoute = ({component: Component, ...rest}) => {
    const history = useHistory();
    const isEmailValidate = useSelector((state) => state.auth.user.emailValidated);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        history.push('/login');
        return <AppRoute path="/login" component={Login}/>;
    } else {
        return <AppRoute {...rest} component={isEmailValidate ? Component : EmailValidate}/>;
    }
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