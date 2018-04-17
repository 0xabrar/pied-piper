import React from "react";
import { Table, Button, Header } from "semantic-ui-react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  FACULTY_USER,
  ASSOCIATE_CHAIR,
  GRAD_STAFF,
  BUDGET_DIRECTOR
} from "../constants/users";
import {
  approveApplicantThunk,
  approveOfferProposalThunk,
  assignApplicantThunk,
  confirmAcceptanceThunk,
  confirmDeclineThunk,
  grantTicketThunk
} from "../actions/thunk/allTickets";
import { loadTicketsThunk } from "../actions/thunk/allTickets";
import { getUserState } from "../reducers";
import { push } from "react-router-redux";
import { getAllFacultyThunk } from "../actions/thunk/faculty";
import { getAllApplicantsThunk } from "../actions/thunk/applicants";

class ApplicantTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filterStr: "" };
  }
  componentDidMount() {
    this.props.loadApplicants();
  }
  render() {
    if (this.props.applicants) {
      return (
        <div>
          <Header as="h2">Applicants</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>First Name</Table.HeaderCell>
                <Table.HeaderCell>Last Name</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.applicants.map((f, i) => (
                <ApplicantTableRow key={i} f={f} />
              ))}
            </Table.Body>
          </Table>
        </div>
      );
    } else {
      return <Header as="h2"> No applicants to show.</Header>;
    }
  }
}

class ApplicantTableRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.f.applicantId}</Table.Cell>
        <Table.Cell>{this.props.f.personalInfo.firstName}</Table.Cell>
        <Table.Cell>{this.props.f.personalInfo.lastName}</Table.Cell>
      </Table.Row>
    );
  }
}

const mapStateToProps = state => ({
  applicants: state.applicants
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadApplicants: getAllApplicantsThunk
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantTable);
