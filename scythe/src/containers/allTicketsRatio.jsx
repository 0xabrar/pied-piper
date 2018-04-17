import React from "react";
import {
  GRANTED_STATE,
  REQUESTED_STATE,
  PENDING_STATE,
  ACCEPTED_STATE,
  INITIAL_STATE,
  REFUSED_STATE
} from "../constants/tickets";
import { getTicketState } from "../reducers/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Pie } from "react-chartjs-2";
import { Statistic } from "semantic-ui-react";

const style = {
  rootDiv: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    padding: "1rem"
  },
  statsDiv: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateRows: "1fr 1fr"
  }
};

const createDataObj = (labels, data) => {
  return {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          "#ff7f00",
          "#ffd700",
          "#20b2ad",
          "#800080",
          "#000066",
          "#cd0000"
        ],
        hoverBackgroundColor: [
          "#ff7f00",
          "#ffd700",
          "#20b2ad",
          "#800080",
          "#000066",
          "#cd0000"
        ]
      }
    ]
  };
};

// NOTE: this does not include 'INITIAL', 'REJECTED' tickets
class AllTicketsRatio extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
  }
  getData() {
    this.initial = this.props.tickets.filter(
      ticket => ticket.state === INITIAL_STATE
    ).length;
    this.granted = this.props.tickets.filter(
      ticket => ticket.state === GRANTED_STATE
    ).length;
    this.offerRequest = this.props.tickets.filter(
      ticket => ticket.state === REQUESTED_STATE
    ).length;
    this.offerPending = this.props.tickets.filter(
      ticket => ticket.state === PENDING_STATE
    ).length;
    this.offerAccepted = this.props.tickets.filter(
      ticket => ticket.state === ACCEPTED_STATE
    ).length;
    this.offerRefused = this.props.tickets.filter(
      ticket => ticket.state === REFUSED_STATE
    ).length;

    return createDataObj(
      ["Granted", "Offer Requested", "Offer Pending", "Accepted"],
      [this.granted, this.offerRequest, this.offerPending, this.offerAccepted]
    );
  }
  render() {
    return (
      <div style={style.rootDiv}>
        <div style={{ width: "50%" }}>
          <Pie
            data={this.getData()}
            options={{ legend: { position: "right" } }}
          />
        </div>

        <div style={style.statsDiv}>
          <Statistic>
            <Statistic.Value>{this.initial}</Statistic.Value>
            <Statistic.Label>Initial Tickets</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{this.granted}</Statistic.Value>
            <Statistic.Label>Granted Tickets</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{this.offerRequest}</Statistic.Value>
            <Statistic.Label>Requested Tickets</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{this.offerPending}</Statistic.Value>
            <Statistic.Label>Pending Tickets</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{this.offerAccepted}</Statistic.Value>
            <Statistic.Label>Accepted Tickets</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{this.offerRefused}</Statistic.Value>
            <Statistic.Label>Refused Tickets</Statistic.Label>
          </Statistic>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tickets: getTicketState(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AllTicketsRatio);
