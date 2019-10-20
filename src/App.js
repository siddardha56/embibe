import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from './components/Login';
import DashBoard from './components/DashBoard';
import Details from './components/Details';
import PrivateRoute from './privateRoute';

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={DashBoard} />
        <Route path="/login" component={Login} />
        <PrivateRoute exact path="/:id" component={Details} />
      </Switch>
    </Router>
  );
}

export default App;


