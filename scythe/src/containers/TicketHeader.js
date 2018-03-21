import React from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'

const style = {
	status: {
		PENDING: {
			color: "yellow"
		},
		GRANTED: {
			color: "green"
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

const mapStateToProps = (state) => {
	return {
		ticketNumber: 123 //state.selectedTicket.ticketNumber
	}
}


export default connect(
	mapStateToProps
)(TicketHeader)