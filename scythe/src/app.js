import React from "react";
import { Route, Link, Redirect } from "react-router-dom";
import GAPFListContainer from "./containers/gapfList";
import AllTickets from "./components/AllTickets";
import Login from "./containers/login";
import DashboardLayout from "./components/layouts/dashboardLayout";
import TicketViewContainer from "./containers/ticketViewContainer";
import Upload from "./containers/uploadScreen";
import UserDashboard from "./containers/UserDashboard";
import FacultyTable from "./containers/facultyTable";
import ApplicantTable from "./containers/applicantTable";

const App = () => (
  <div>
    <main>
      <Route path="/login" component={Login} />

      <DashboardLayout exact path="/dashboard" component={UserDashboard} />
      <DashboardLayout exact path="/faculty" component={FacultyTable} />
      <DashboardLayout exact path="/applicants" component={ApplicantTable} />
      <DashboardLayout exact path="/tickets" component={AllTickets} />
      <DashboardLayout
        path="/tickets/:number"
        component={TicketViewContainer}
      />
      <DashboardLayout exact path="/gapf" component={GAPFListContainer} />
      <DashboardLayout exact path="/upload" component={Upload} />
    </main>
  </div>
);

export default App;
