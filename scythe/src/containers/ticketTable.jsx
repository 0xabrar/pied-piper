import React from 'react'
import { Table, Button, Header } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FACULTY_USER, ASSOCIATE_CHAIR, GRAD_STAFF, BUDGET_DIRECTOR } from "../constants/users";
import { approveOfferProposalThunk } from "../actions/thunk/allTickets";
import { loadTicketsThunk } from "../actions/thunk/allTickets";
import { getUserState } from "../reducers";


class TicketTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {filterStr: ''}
    this.USER_TICKET_ACTIONS = {
      'FACULTY': [
        {
          name: 'Assign Applicant',
          action: this.props.assignApplicant
        }
      ],
      'ASSOCIATE_CHAIR': [
        {
          name: 'Approve Offer Proposal',
          action: this.props.approveOfferProposal
        }
      ],
      'GRAD_STAFF': [
        {
          name: 'Approve Applicant',
          action: this.props.approveApplicant
        },
        {
          name: 'Confirm Acceptance',
          action: this.props.confirmAcceptance
        },
        {
          name: 'Confirm Rejection',
          action: this.props.confirmRejection
        }
      ],
      'BUDGET_DIRECTOR': [
        {
          name: 'Grant ticket',
          action: this.props.grantTicket
        }
      ]
    }
  }
  render() {
    if(this.props.tickets){
      return (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Ticket #</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.tickets.map((ticket, i) => <TicketTableRow key={i} actions={this.USER_TICKET_ACTIONS[this.props.userType]} ticket={ticket} />)}
          </Table.Body>
        </Table>
      )
    }
    else {
     return <Header as='h2'> No tickets to show.</Header>
    }
  }
}

const TicketTableRow = (props) => {
  return (
    <Table.Row>
      <Table.Cell>{props.ticket.ticketId}</Table.Cell>
      <Table.Cell>{getTicketApplicantName(props.ticket.applicant)}</Table.Cell>
      <Table.Cell>
        {props.actions.map((action, i) => <ActionButton key={i} name={action.name} func={action.action} ticket={props.ticket}/>)}
      </Table.Cell>
    </Table.Row>
  )
}

class ActionButton extends React.Component{
  constructor(props){
    super(props)
    this.executeAction = this.executeAction.bind(this)
  }
  executeAction(){
    console.log(this.props.func)
    this.props.func(this.props.ticket)
  }
  render () {
    return (
      <Button onClick={this.executeAction}>{this.props.name}</Button>
    )
  }
}

const getTicketApplicantName = (app) => {
  if(app) {
    return app.lastName + ', ' + app.firstName
  }
  return 'None'
}

const mapStateToProps = (state) => ({
  userType: getUserState(state).user.type
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    approveOfferProposal: approveOfferProposalThunk
  }
  , dispatch);

/**
 *  loadTickets: loadTicketsThunk,
 *  assignApplicant: assignApplicantThunk,
 *  approveOfferProposal: approveOfferProposalThunk,
 *  approveApplicant: approveApplicantThunk,
 *  confirmAcceptance: confirmAcceptanceThunk,
 *  confirmRejection: confirmRejectionThunk,
 *  grantTicket: grantTicketThunk
 */

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketTable)
