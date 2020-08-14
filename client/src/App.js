import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import LogIn from "./pages/LogIn";
import ItemList from "./components/ItemList";
import AddTodo from "./components/AddTodo";
import "antd/dist/antd.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ItemList} />
        <Route exact path="/addTodo" component={AddTodo} />
        <Route exact path="/login" component={LogIn} />
      </Switch>
    </Router>
  );
}

export default App;
