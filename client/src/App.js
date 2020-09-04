import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Todos from "./pages/Todos";
import Todo from "./pages/Todo";
import NewTodo from "./pages/NewTodo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Container from "@material-ui/core/Container";
import {useSelector} from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.todos.isLoggedIn);
  console.log("isLoggedIn ===> ", isLoggedIn);

  return (
    <Container>
      <Router>
        <Switch>
          {isLoggedIn ? <Route exact path="/" component={Todos} /> : <Route exact path="/" component={Login} />}

          <Route exact path="/todos" component={Todos} />
          <Route exact path="/todos/new" component={NewTodo} />
          <Route exact path="/todos/:id" component={Todo} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          {/*<Route exact path="/auth/password/:hash" component={Signup} />*/}
          {/*<Route exact path="/auth/new-password" component={Signup} />*/}
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
