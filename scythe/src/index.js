import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router'
import store, { history } from './store'
import TicketListContainer from './containers/ticketList';
import DashboardLayout from './components/layouts/dashboardLayout';

import 'sanitize.css/sanitize.css'
import 'semantic-ui-css/semantic.min.css';

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
          <DashboardLayout path='/tickets' component={TicketListContainer} />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)
