import React, { Component } from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Table } from "semantic-ui-react";

// TODO: this is replaced by code in another branch
class TicketListContainer extends Component {
  render() {
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
          <Table.Row>
            <Table.Cell>John</Table.Cell>
            <Table.Cell>No Action</Table.Cell>
            <Table.Cell>None</Table.Cell>
            <Table.Cell>None</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      redirectLogin: () => push("/login")
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  TicketListContainer
);
