import React from 'react'
import { Progress } from 'semantic-ui-react'


class StateRatio extends React.Component {
  getRatio() {
    // TODO: Is ticket.type valid?
    let intlCount = this.props.tickets.filter((ticket) => (ticket.type === 'INTERNATIONAL' && ticket.status === this.props.state)).length
    let totalCount = this.props.tickets.filter((ticket) => (ticket.status === this.props.state)).length
    return intlCount/totalCount;
  }
  render(){
    return (
      <Progress percent={100 - this.getRatio()} />
    )
  }
}

export default StateRatio;



