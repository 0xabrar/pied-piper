import React from 'react'
import { Table, Button, Header } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FACULTY_USER, ASSOCIATE_CHAIR, GRAD_STAFF, BUDGET_DIRECTOR } from "../constants/users";
import {
  approveApplicantThunk, approveOfferProposalThunk, assignApplicantThunk, confirmAcceptanceThunk, confirmDeclineThunk,
  grantTicketThunk
} from "../actions/thunk/allTickets";
import { loadTicketsThunk } from "../actions/thunk/allTickets";
import { getUserState } from "../reducers";
import {push} from 'react-router-redux'
import { updateSelectedTicket } from "../actions/actionCreators/notes";
import ActionModal from "../components/actionModal";


class TicketTable extends React.Component {
  constructor(props) {
    super(props)
    this.openGrantModal = this.openGrantModal.bind(this)
    this.state = {filterStr: '', grantModal: false, selected: {}, appModal: false}
    this.USER_TICKET_ACTIONS = {
      'FACULTY': [
        {
          name: 'Assign Applicant',
          action: this.openAppModal
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
          action: this.props.confirmDecline
        }
      ],
      'BUDGET_DIRECTOR': [
        {
          name: 'Grant ticket',
          action: this.openGrantModal
        }
      ]
    }
  }
  openGrantModal(ticket){
    this.setState({grantModal: true, selected: ticket})
  }
  closeGrantModal(){
    this.setState({grantModal: false, selected: {}})
  }
  openAppModal(ticket){
    this.setState({appModal: true, selected: ticket})
  }
  closeAppModal(){
    this.setState({appModal: false, selected: {}})
  }
  render() {
    if(this.props.tickets){
      return (
        <div>
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
          <ActionModal open={this.state.appModal} close={this.closeAppModal} title={'Choose Applicant'} action={this.props.assignApplicant} options={[{name: "david", applicantId: 5}]} headers={['ID', 'Name']}/>
          <ActionModal open={this.state.grantModal} close={this.closeGrantModal} title={'Grant Ticket'} action={this.props.grantTicket} options={[{name: "david", facultyId: 5}]} headers={['ID', 'Name']}/>
        </div>
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
        <Table.Cell>{getTicketFacultyName(this.props.ticket.faculty.personalInfo)}</Table.Cell>
        <Table.Cell>{getTicketApplicantName(this.props.ticket.applicant.personalInfo)}</Table.Cell>
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
    grantTicket: grantTicketThunk,
    approveOfferProposal: approveOfferProposalThunk,
    assignApplicant: assignApplicantThunk,
    approveApplicant: approveApplicantThunk,
    confirmAcceptance: confirmAcceptanceThunk,
    confirmDecline: confirmDeclineThunk,
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
