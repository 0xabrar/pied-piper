import React from 'react'
import { Table, Button, Header } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FACULTY_USER, ASSOCIATE_CHAIR, GRAD_STAFF, BUDGET_DIRECTOR } from "../constants/users";
import { approveOfferProposalThunk } from "../actions/thunk/allTickets";
import { loadTicketsThunk } from "../actions/thunk/allTickets";
import { getUserState } from "../reducers";
import TicketTable from './ticketTable';


class StateTable extends React.Component {
  componentDidMount(){
    // TODO: Uncomment
    //this.props.loadTickets();
  }
  render() {
    if(this.props.tickets){
      return (
        <div>
          <Header as='h2'>{getStateTitle(this.props.state)}</Header>
          <TicketTable tickets={this.props.tickets.filter((ticket) => ticket.state === this.props.state)} />
        </div>

      )
    }
    else {
      return <Header as='h2'> No tickets to show.</Header>
    }
  }
}

const stateToTitle = {
  INITIAL_STATE: 'Initial Tickets',
  GRANTED_STATE: 'Granted Tickets',
  REQUESTED_STATE: 'Requested Tickets',
  PENDING_STATE: 'Pending Tickets',
  REFUSED_STATE: 'Refused Tickets',
  ACCEPTED_STATE: 'Accepted Tickets'
}

const getStateTitle = (state) => {
  return stateToTitle[state];
}

const mapStateToProps = (state) => ({
  tickets: state.allTickets.tickets,
  userType: getUserState(state).user.type
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loadTickets: loadTicketsThunk,
  }
  , dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StateTable)
