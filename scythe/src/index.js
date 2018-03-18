import "sanitize.css/sanitize.css";
import "semantic-ui-css/semantic.min.css";

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Route } from "react-router";
import store, { history } from "./store";
import TicketListContainer from "./containers/ticketList";
import GAPFListContainer from "./containers/gapfList";
import DashboardLayout from "./components/layouts/dashboardLayout";
import Login from "./containers/login";
import dotenv from "dotenv";
dotenv.load();

const target = document.querySelector("#root");

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path="/login" component={Login} />
        <DashboardLayout path="/tickets" component={TicketListContainer} />
        <DashboardLayout path="/gapf" component={GAPFListContainer} />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
);
