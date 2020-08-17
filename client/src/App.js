import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Todos from "./pages/Todos";
import Todo from "./pages/Todo";
import AddTodo from "./components/AddTodo";
import TodoView from "./components/TodoView";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Todos} />
        <Route exact path="/todos" component={Todos} />
        <Route exact path="/todos/:id" component={Todo} />

        <Route exact path="/addTodo" component={AddTodo} />
        <Route exact path="/todoView" component={TodoView} />
        <Route exact path="/login" component={LogIn} />
      </Switch>
    </Router>
  );
}

export default App;
