import React from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'

const style = {
	status: {
		"PENDING": {
			color: "yellow",
			float: "right"
		},
		"GRANTED": {
			color: "green",
			float: "right"
		}
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

export default TicketHeader