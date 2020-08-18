import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Todos from "./pages/Todos";
import Todo from "./pages/Todo";
import NewTodo from "./pages/NewTodo";
import Container from "@material-ui/core/Container";
import "./App.css";

function App() {
  return (
    <Container>
      <Router>
        <Switch>
          <Route exact path="/" component={Todos} />
          <Route exact path="/todos" component={Todos} />
          <Route exact path="/todos/new" component={NewTodo} />
          <Route exact path="/todos/:id" component={Todo} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
