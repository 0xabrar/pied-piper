import React from "react";
import { Route, Link } from "react-router-dom";
import GAPFListContainer from "./containers/gapfList";
import TicketListContainer from "./containers/ticketList";
import Login from "./containers/login";
import DashboardLayout from "./components/layouts/dashboardLayout";
import TicketViewContainer from "./containers/ticketViewContainer";
import Upload from "./containers/uploadScreen"

const App = () => (
  <div>
    <main>
      <Route path="/login" component={Login} />
      <DashboardLayout path="/dashboard" component={TicketListContainer} />
      <DashboardLayout exact path="/tickets" component={TicketListContainer} />
      <DashboardLayout
        path="/tickets/:number"
        component={TicketViewContainer}
      />
      <DashboardLayout path="/applicants" component={TicketListContainer} />
      <DashboardLayout path="/gapf" component={GAPFListContainer} />
      <DashboardLayout path="/upload" component={Upload} />
      
    </main>
  </div>
);

export default App;
