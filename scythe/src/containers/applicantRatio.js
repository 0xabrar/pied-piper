import React from "react";
import { Header } from "semantic-ui-react";
import { Pie } from "react-chartjs-2";
import { DOMESTIC, INTERNATIONAL } from "../constants/users";
import { getTicketState, getUserState } from "../reducers";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  INITIAL_STATE,
  GRANTED_STATE,
  REQUESTED_STATE,
  PENDING_STATE,
  REFUSED_STATE,
  ACCEPTED_STATE
} from "../constants/tickets";

let intlCount = 5;
let domCount = 5;

const createDataObj = (labels, data) => {
  return {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"]
      }
    ]
  };
};

const countIntl = tickets => {
  return tickets.filter(ticket => ticket.type.trim() === INTERNATIONAL).length;
};

const stateToTitle = {
  INITIAL: "Initial Tickets",
  GRANTED: "Granted Tickets",
  REQUESTED: "Requested Tickets",
  PENDING: "Pending Tickets",
  REFUSED: "Refused Tickets",
  ACCEPTED: "Accepted Tickets"
};

const getStateTitle = state => {
  return stateToTitle[state];
};

class ApplicantRatio extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
  }
  getData() {
    var intlCount = 0;
    var domCount = 0;
    if (this.props.state) {
      let filteredTickets = this.props.tickets.filter(
        ticket => ticket.state === this.props.state
      );
      console.log(
        `State: ${this.props.state} Count: ${filteredTickets.length}`
      );
      intlCount = countIntl(filteredTickets);
      domCount = filteredTickets.length - intlCount;
    } else {
      intlCount = countIntl(this.props.tickets);
      domCount = this.props.tickets.length - intlCount;
    }
    return createDataObj(["International", "Domestic"], [intlCount, domCount]);
  }
  render() {
    if (
      this.props.tickets.filter(ticket => ticket.state === this.props.state)
        .length === 0
    ) {
      return (
        <div>
          <Header textAlign="center" as="h3">
            {getStateTitle(this.props.state)}
          </Header>
          <Header textAlign="center" as="h3" style={{ marginTop: "100px" }}>
            No matching data.
          </Header>
        </div>
      );
    } else {
      return (
        <div>
          <Header textAlign="center" as="h3">
            {getStateTitle(this.props.state)}
          </Header>
          <Pie data={this.getData()} />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  tickets: getTicketState(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantRatio);
