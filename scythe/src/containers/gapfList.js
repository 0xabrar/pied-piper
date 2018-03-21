import React, { Component } from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getAllGAPFThunk } from "../actions/thunk/gapf";
import { getGAPFState } from "../reducers/index";

class GAPFListContainer extends Component {
  componentDidMount() {
    this.props.getAllGAPF();
  }

  render() {
    const gapf = this.props.gapf;

    return (
      <div>
        <pre>{JSON.stringify(gapf, null, 2)}</pre>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gapf: getGAPFState(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      redirectLogin: () => push("/login"),
      getAllGAPF: getAllGAPFThunk
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(GAPFListContainer);
