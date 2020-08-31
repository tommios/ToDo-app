import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Todos from "./pages/Todos";
import Todo from "./pages/Todo";
import NewTodo from "./pages/NewTodo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Container from "@material-ui/core/Container";

function App() {
  return (
    <Container>
      <Router>
        <Switch>
          <Route exact path="/" component={Todos} />
          <Route exact path="/todos" component={Todos} />
          <Route exact path="/todos/new" component={NewTodo} />
          <Route exact path="/todos/:id" component={Todo} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
