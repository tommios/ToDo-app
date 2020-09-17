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


// todo move to configs
/* eslint eqeqeq: 0 */
function PrivateRoute({component: Component, redirectTo, authed, verify, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!authed) {
                    return <Redirect to={{pathname: redirectTo, state: {from: props.location}}}/>
                } else if (!verify) {
                    return <EmailValidate/>
                } else if (!!verify && !!authed) {
                    return <Component {...props} />
                }
            }}
        />
    )
}

function App() {
    const dispatch = useDispatch();

    const isResponse = useSelector((state) => getQuery(state, {type: SET_CURRENT_USER}));
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isEmailValidate = useSelector((state) => state.auth.user.emailValidated);

    useEffect(() => {
        dispatch(init())
    }, [dispatch])


    console.log("isEmailValidate ===> ", isEmailValidate);
    console.log("isAuthenticated ===> ", isAuthenticated);

    if (isResponse.loading || isResponse.pristine) {
        return (
            <div>
                <CircularProgress size={"10rem"} style={{margin: "5em 50em 5em"}}/>
            </div>
        )
    } else {
        return (
            <Container>
                <Router>
                    <Switch>
                        <PrivateRoute authed={!isAuthenticated} verify={!isEmailValidate} exact path="/login"
                                      redirectTo='/' component={Login}/>
                        <PrivateRoute authed={!isAuthenticated} verify={!isEmailValidate} exact path="/signup"
                                      redirectTo='/' component={Signup}/>
                        <PrivateRoute authed={isAuthenticated} verify={isEmailValidate} exact path="/"
                                      redirectTo="/login"
                                      component={Todos}/>
                        <PrivateRoute authed={isAuthenticated} verify={isEmailValidate} exact path="/todos"
                                      redirectTo="/login"
                                      component={Todos}/>
                        <PrivateRoute authed={isAuthenticated} verify={isEmailValidate} exact path="/todos/new"
                                      redirectTo="/login"
                                      component={NewTodo}/>
                        <PrivateRoute authed={isAuthenticated} verify={isEmailValidate} exact path="/todos/:id"
                                      redirectTo="/login"
                                      component={Todo}/>
                        <PrivateRoute authed={!isAuthenticated} verify={!isEmailValidate} exact path="/reset"
                                      redirectTo="/login"
                                      component={ResetPassword}/>
                        <PrivateRoute authed={!isAuthenticated} verify={!isEmailValidate} exact path="/password/:token"
                                      redirectTo="/login"
                                      component={NewPassword}/>
                        <PrivateRoute authed={isAuthenticated} verify={!isEmailValidate} exact path="/verify/:hash"
                                      redirectTo="/login"
                                      component={EmailConfirm}/>
                    </Switch>
                </Router>
            </Container>
        );
    }

}

export default App;
