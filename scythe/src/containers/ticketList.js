import React, { Component } from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Table } from "semantic-ui-react";

import { getAllTicketsThunk } from "../actions/thunk/tickets";
import { getTicketState } from "../reducers/index";

// TODO: this is replaced by code in another branch
class TicketListContainer extends Component {
  componentWillMount() {
    this.props.getAllTickets();
  }

  render() {
    const tickets = this.props.tickets;
    const ticketViews = tickets.map((ticket, i) => (
      <Table.Row>
        <Table.Cell>{ticket.ticketId}</Table.Cell>
        <Table.Cell>{ticket.facultyId}</Table.Cell>
        <Table.Cell>{ticket.applicantId}</Table.Cell>
        <Table.Cell>{ticket.state}</Table.Cell>
      </Table.Row>
    ))
    return (
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>TicketID</Table.HeaderCell>
            <Table.HeaderCell>Faculty</Table.HeaderCell>
            <Table.HeaderCell>Applicant</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {ticketViews}
        </Table.Body>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  tickets: getTicketState(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      redirectLogin: () => push("/login"),
      getAllTickets: getAllTicketsThunk
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  TicketListContainer
);
