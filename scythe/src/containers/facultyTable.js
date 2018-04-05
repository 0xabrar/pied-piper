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
import {getAllFacultyThunk} from "../actions/thunk/faculty";


class FacultyTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {filterStr: ''}
  }
  componentDidMount(){
    this.props.loadFaculty()
  }
  render() {
    if(this.props.faculty){
      return (
        <div>
          <Header as='h2'>Faculty</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Department</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.faculty.map((f, i) => <FacultyTableRow key={i} f={f}/>)}
            </Table.Body>
          </Table>
        </div>
      )
    }
    else {
      return <Header as='h2'> No faculty to show.</Header>
    }
  }
}

class FacultyTableRow extends React.Component {
  constructor(props){
    super(props)
  }
  render () {
    return (
      <Table.Row>
        <Table.Cell>{this.props.f.facultyId}</Table.Cell>
        <Table.Cell>{getTicketFacultyName(this.props.f.personalInfo)}</Table.Cell>
        <Table.Cell>{this.props.f.department}</Table.Cell>
        <Table.Cell>{this.props.f.email}</Table.Cell>
      </Table.Row>
    )
  }
}

const getTicketFacultyName = (faculty) => {
  if(faculty) {
    return faculty.lastName + ', ' + faculty.firstName
  }
  return 'None'
}

const mapStateToProps = (state) => ({
  faculty: state.faculty
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loadFaculty: getAllFacultyThunk
  }
  , dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacultyTable)
