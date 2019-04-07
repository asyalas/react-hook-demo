import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Redux from './Redux'
import GlobalContext from './GlobalContext'
import "antd/dist/antd.min.css";

import * as history  from "history";
export default () => {
  return (
    <Router history={history.createBrowserHistory()}>
      <Switch>
        <Route path="/" component={Home} exact={true}/>;
        <Route path="/redux" component={Redux} exact={true} />;
        <Route path="/globalContext" component={GlobalContext} exact={true} />;
      </Switch>
    </Router>
  );
};
