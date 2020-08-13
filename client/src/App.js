import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import login from "./pages/login";
import ItemList from "./components/ItemList";
import example from "./pages/example";

function App() {
  return (
    <Router>
      <div>
        <Link to="/login">Log In</Link>
        <br />
        <br />
        <br />

        <ItemList />
        <Switch>
          <Route exact path="/login" component={login} />
          {/* <Route exact path="/" component={} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
