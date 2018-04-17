import React from "react";
import { Progress } from "semantic-ui-react";

class StateCount extends React.Component {
  constructor(props) {
    super(props);
    this.getCount = this.getCount.bind(this);
  }
  getCount() {
    return this.props.tickets.filter(
      ticket => ticket.status === this.props.state
    ).length;
  }
  render() {
    return <Progress value={this.getCount()} />;
  }
}

export default StateCount;
