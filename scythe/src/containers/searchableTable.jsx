import React from 'react'
import { Table, Button, Header } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FACULTY_USER, ASSOCIATE_CHAIR, GRAD_STAFF, BUDGET_DIRECTOR } from "../constants/users";
import { approveOfferProposalThunk } from "../actions/thunk/allTickets";
import { loadTicketsThunk } from "../actions/thunk/allTickets";
import { getUserState } from "../reducers";


class SearchableTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {filterStr: ''}
  }
  componentDidMount(){
    // TODO: Uncomment
    //this.props.loadTickets();
  }
  render() {
    if(this.props.tickets){
      return (
        <div>
          <div className="ui input focus fluid">
            <input placeholder="Search..." type="text" onChange={ e => this.setState({ filterStr: e.target.value }) } value={this.state.filterStr} />
          </div>
          <TicketTable tickets={this.props.tickets.filter(t => searchTicket(t, this.state.filterStr))} />
        </div>
      )
    }
    else {
      return <Header as='h2'> No tickets to show.</Header>
    }
  }
}

const searchTicket = (ticket, str) => {
  console.log(ticket)
  return (ticket.ticketId.includes(str)
    || ticket.applicant.lastName.includes(str)
    || ticket.applicant.firstName.includes(str))
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
)(SearchableTable)
