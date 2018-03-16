import React, { Component } from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// TODO: this is replaced by code in another branch
class TicketListContainer extends Component {
  render() {
    return <div />;
  }
}

const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      redirectLogin: () => push("/login")
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  TicketListContainer
);
