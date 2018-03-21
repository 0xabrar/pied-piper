import React from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import TicketHeader from '../components/TicketHeader'
import NoteContainer from '../components/NoteContainer'

const style = {
	root: {
		width: "100%"
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
  constructor(props){
  	super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleResolve = this.handleResolve.bind(this)

  }
	handleDelete(index) {
		this.props.deleteComment(index)
	}
	handleResolve(index){
		this.props.resolveComment(index)
	}

	render() {
		return (
			<div style={style.root}>
				<TicketHeader ticketNumber={this.props.ticket.number} status={""}/>
				<ApplicantInfo info={this.props.ticket.applicant.personalInfo} applicant={this.props.ticket.applicant} />
				<NoteContainer notes={this.props.ticket.comments} />
			</div>
		)
	}
}




const ApplicantInfo = (props) => {
	if(!props.applicant){
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
					<p><span style={style.applicantInfo.propertyName}>Applicant ID: </span> {props.applicant.applicantId}</p>
					<p><span style={style.applicantInfo.propertyName}>Name: </span>{props.info.firstName + ' ' + props.info.lastName}</p>
					<p><span style={style.applicantInfo.propertyName}>Phone: </span>{props.info.phoneNumber}</p>
					<p><span style={style.applicantInfo.propertyName}>Email: </span>{props.info.email}</p>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	ticket: state.selectedTicket
});

export default connect(
	mapStateToProps
)(TicketViewContainer)