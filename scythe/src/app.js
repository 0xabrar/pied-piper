import React from 'react';
import { Route, Link } from 'react-router-dom'
import GAPFListContainer from "./containers/gapfList";
import TicketListContainer from "./containers/ticketList";
import Login from "./containers/login";

const App = () => (
  <div>
    <main>
			<Route path="/login" component={Login} />
			<DashboardLayout path="/tickets" component={TicketListContainer} />
			<DashboardLayout path="/gapf" component={GAPFListContainer} />
    </main>
  </div>
)

export default App
