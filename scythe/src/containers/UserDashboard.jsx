import React from 'react'
import {approveOfferProposalThunk, loadTicketsThunk} from "../actions/thunk/allTickets";
import {getUserState} from "../reducers/index";
import {ASSOCIATE_CHAIR, BUDGET_DIRECTOR, FACULTY_USER} from "../constants/users";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AssignedTicketOriginRatio from "../components/StateRatio";
import {INITIAL_STATE, GRANTED_STATE, REQUESTED_STATE, ACCEPTED_STATE, PENDING_STATE} from "../constants/tickets";
import StateCount from '../components/StateCount'
import StateRatio from '../components/StateRatio'

const style = {
  rootDiv: {
    display: "grid",
    gridTemplateRows: "1fr 1fr 1fr"
  }
}

class UserDashboard extends React.Component{
  render () {
    switch (props.userType){
      case BUDGET_DIRECTOR:
        return (
          <div style={style.rootDiv}>
            <StateCount tickets={this.props.tickets} state={INITIAL_STATE} />
            <StateRatio tickets={this.props.tickets} state={GRANTED_STATE}/>
            {/* TODO: Filter table */}
            <TicketTable />
          </div>
        )

      case FACULTY_USER:
        return (
          <div style={style.rootDiv}>
            <GAPFStatus />
            <StateTable state={GRANTED_STATE} />
            <StateTable state={REQUESTED_STATE} />
            <StateTable state={ACCEPTED_STATE} />
          </div>
        )

      case ASSOCIATE_CHAIR:
        return (
          <div style={style.rootDiv}>
            <StateTable state={REQUESTED_STATEgit } />
          </div>
        )
    }
  }
}

const mapStateToProps = (state) => ({
  tickets: state.tickets.tickets
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDashboard)

