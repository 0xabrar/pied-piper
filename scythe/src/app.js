import React from "react";
import { Route, Link } from "react-router-dom";
import GAPFListContainer from "./containers/gapfList";
import AllTickets from './components/AllTickets'
import Login from "./containers/login";
import DashboardLayout from "./components/layouts/dashboardLayout";
import TicketViewContainer from "./containers/ticketViewContainer";
import Upload from "./containers/uploadScreen"

const App = () => (
  <div>
    <main>
      <Route path="/login" component={Login} />
      <DashboardLayout path="/dashboard" component={AllTickets} />
      <DashboardLayout exact path="/tickets" component={AllTickets} />
      <DashboardLayout
        path="/tickets/:number"
        component={TicketViewContainer}
      />
      <DashboardLayout path="/applicants" component={AllTickets} />
      <DashboardLayout path="/gapf" component={GAPFListContainer} />
      <DashboardLayout path="/upload" component={Upload} />
      
    </main>
  </div>
);

export default App;
