import React from 'react'
import { Table, Button, Header } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FACULTY_USER, ASSOCIATE_CHAIR, GRAD_STAFF, BUDGET_DIRECTOR } from "../constants/users";
import { approveOfferProposalThunk } from "../actions/thunk/allTickets";
import { loadTicketsThunk } from "../actions/thunk/allTickets";
import { getUserState } from "../reducers";
import {push} from 'react-router-redux'
import { updateSelectedTicket } from "../actions/actionCreators/notes";


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
              <Table.HeaderCell>Faculty</Table.HeaderCell>
              <Table.HeaderCell>Applicant</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.tickets.map((ticket, i) => <TicketTableRow key={i}
                                                                   actions={this.USER_TICKET_ACTIONS[this.props.userType]}
                                                                   ticket={ticket}
                                                                   openTicket={this.props.openTicket}
                                                                   updateSelectedTicket={this.props.updateSelectedTicket}/>)}
          </Table.Body>
        </Table>
      )
    }
    else {
     return <Header as='h2'> No tickets to show.</Header>
    }
  }
}

const stateToText = (st) => {
  return st[0] + st.toLowerCase().substring(1)
}

class TicketTableRow extends React.Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick (e) {
    this.props.updateSelectedTicket(this.props.ticket)
    this.props.openTicket(this.props.ticket.ticketId)
  }
  render () {
    return (
      <Table.Row>
        <Table.Cell><Button onClick={this.handleClick}>{this.props.ticket.ticketId}</Button></Table.Cell>
        <Table.Cell>{getTicketFacultyName(this.props.ticket.faculty)}</Table.Cell>
        <Table.Cell>{getTicketApplicantName(this.props.ticket.applicant)}</Table.Cell>
        <Table.Cell>{stateToText(this.props.ticket.state)}</Table.Cell>
        <Table.Cell>
          {this.props.actions.map((action, i) => <ActionButton key={i} name={action.name} func={action.action} ticket={this.props.ticket}/>)}
        </Table.Cell>
      </Table.Row>
    )
  }
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


const getTicketFacultyName = (faculty) => {
  if(faculty) {
    return faculty.lastName + ', ' + faculty.firstName
  }
  return 'None'
}

const mapStateToProps = (state) => ({
  userType: getUserState(state).user.type
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    approveOfferProposal: approveOfferProposalThunk,
    openTicket:  (number) => push("/tickets/" + number),
    updateSelectedTicket: updateSelectedTicket
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
