import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { UserPage } from './components/userPage';
import { UsersPage } from './components/usersPage';


export default function Routes() {
  return (
    <Router>
      <Route exact path="/" component={UsersPage} />
      <Route path="/UserPage/:id" component={UserPage} />
    </Router>
  );
}