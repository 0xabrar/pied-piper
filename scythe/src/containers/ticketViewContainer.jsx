import React from 'react'
import { Header } from 'semantic-ui-react'

const style = {
  root: {
    width: "100%"
  },
  status: {
    PENDING: {
      color: "yellow"
    },
    GRANTED: {
      color: "green"
    }
  }
}
}

class TicketViewContainer extends React.Component{
  render() {
    console.log()
    return (
      <div style={style.root}>
        <TicketHeader ticketNumber={this.props.ticket.number} status={""}/>
        <
      </div>
    )
  }
}


const TicketHeader = (props) => {
  return (
    <div style={style.ticketHeader}>
      <Header as='h1'>{'Ticket #' + props.ticketNumber}</Header>
      <Header as='h2' style={style.status[props.status]}>{props.status}</Header>
    </div>
  )
}

export default TicketViewContainer