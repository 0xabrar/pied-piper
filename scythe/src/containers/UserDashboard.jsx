import React from 'react'
import { Header } from 'semantic-ui-react'
import {getUserState, getTicketState} from "../reducers/index";
import {ASSOCIATE_CHAIR, BUDGET_DIRECTOR, FACULTY_USER, GRAD_STAFF} from "../constants/users";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {INITIAL_STATE, GRANTED_STATE, REQUESTED_STATE, ACCEPTED_STATE, PENDING_STATE} from "../constants/tickets";
import StateCount from '../components/StateCount'
import StateRatio from '../components/StateRatio'
import StateTable from './stateTable'
import ApplicantRatio from './applicantRatio'
import {getFacultyGAPFThunk} from "../actions/thunk/user";
import {getAllTicketsThunk} from "../actions/thunk/tickets";
import BudgetDirectorRatios from "../components/budgetDirectorRatios";
import AllTicketsRatio from './allTicketsRatio'

const style = {
  rootDiv: {

  }
}

class UserDashboard extends React.Component{
  componentDidMount() {
    console.log('Loading tickets...')
    this.props.loadTickets();
  }
  render () {
    if(!this.props.tickets){
      return(<Header as='h2'>No data available.</Header>)
    }
    switch (this.props.user.user.type){
      case BUDGET_DIRECTOR:
        return (
          <div style={style.rootDiv}>
            <BudgetDirectorRatios />
          </div>
        )

      case FACULTY_USER:
        getFacultyGAPFThunk(this.props.user)
        return (
          <div style={style.rootDiv}>
            <GAPFStatus GAPFStatus={this.props.user.gapf}/>
            <AllTicketsRatio />
            <StateTable state={GRANTED_STATE} />
            <StateTable state={REQUESTED_STATE} />
            <StateTable state={ACCEPTED_STATE} />
          </div>
        )

      case ASSOCIATE_CHAIR:
        return (
          <div style={style.rootDiv}>
            <StateTable state={REQUESTED_STATE} />
          </div>
        )

      case GRAD_STAFF:
        return (
          <div style={style.rootDiv}>
            <StateTable state={REQUESTED_STATE}/>
            <StateTable state={PENDING_STATE}/>
          </div>
        )
      default:
        return(<Header as='h2'>Error loading dashboard.</Header>)
    }
  }
}

const GAPFStatus = (props) => {
  if(props.gapf && Object.keys(props.gapf).length > 0){
    return (
      <div>
        <Header as='h2'>GAPF Status: <span style={{color: '#1ae0a1'}}>Completed</span></Header>
      </div>
    )
  } else {
    return (
      <div>
        <Header as='h2'>GAPF Status: <span style={{color: '#f44242'}}>Incomplete</span></Header>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  user: getUserState(state),
  tickets: getTicketState(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getFacultyGAPF: getFacultyGAPFThunk,
  loadTickets: getAllTicketsThunk
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDashboard)

