import React from 'react'
import { Table, Button, Header } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FACULTY_USER, ASSOCIATE_CHAIR, GRAD_STAFF, BUDGET_DIRECTOR } from "../constants/users";
import { approveOfferProposalThunk } from "../actions/thunk/allTickets";
import { getAllTicketsThunk } from "../actions/thunk/tickets.js";
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
          <Header as='h2' style={{marginTop: '20px'}}>{getStateTitle(this.props.state)}</Header>
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
  'INITIAL': 'Initial Tickets',
  'GRANTED': 'Granted Tickets',
  'REQUESTED': 'Requested Tickets',
  'PENDING': 'Pending Tickets',
  'REFUSED': 'Refused Tickets',
  'ACCEPTED': 'Accepted Tickets'
}

const getStateTitle = (state) => {
  return stateToTitle[state];
}

const mapStateToProps = (state) => ({
  tickets: state.tickets,
  userType: getUserState(state).user.type
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loadTickets: getAllTicketsThunk,
  }
  , dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StateTable)
