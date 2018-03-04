import React from 'react'
import { Header } from 'semantic-ui-react'
import NoteContainer from './NoteContainer.jsx'

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
	},
	applicantInfo: {
		root: {
			display: "grid",
			gridTemplateRows: "1fr 1fr",
			gridTemplateColumns: "1fr 1fr"
		},
		propertyName: {
			fontWeight: "bold"
		}
	}
}


class TicketViewContainer extends React.Component{
	render() {
		return (
			<div style={style.root}>
				<TicketHeader ticketNumber={this.props.ticket.number} status={""}/>
				<ApplicantInfo aID={this.props.ticket.applicant.applicantId} applicant={this.props.ticket.applicant} />
				<NoteContainer notes={this.props.ticket.comments} />
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

const ApplicantInfo = (props) => {
	if(!props.aID){
		return(
			<div>
				<Header as='h2'>Applicant</Header>
				<Header as='h3'>No applicant assigned.</Header>
			</div>
		)
	}
	else{
		return(
			<div>
				<Header as='h2'>Applicant</Header>
				<div style={style.applicantInfo.root}>
					<p><span style={style.applicantInfo.propertyName}>Applicant ID: </span> {props.aID}</p>
					<p><span style={style.applicantInfo.propertyName}>Name: </span>{props.applicant.firstName + ' ' + props.applicant.lastName}</p>
					<p><span style={style.applicantInfo.propertyName}>Phone: </span>{props.applicant.phoneNumber}</p>
					<p><span style={style.applicantInfo.propertyName}>Email: </span>{props.applicant.email}</p>
				</div>
			</div>
		)
	}
}

export default TicketViewContainer