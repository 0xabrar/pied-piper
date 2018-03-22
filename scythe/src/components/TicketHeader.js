import React from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'

const style = {
	ticketHeader: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr"
	},
	status: {
		"PENDING": {
			color: "#00000",
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
			<Header as='h1' style={style.status[props.status]}>{props.status}</Header>
		</div>
	)
}

export default TicketHeader