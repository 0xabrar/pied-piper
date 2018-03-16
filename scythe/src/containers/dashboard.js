import React from "react";
import PropType from "prop-types";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Route } from "react-router";
import Header from "../components/header";

DashboardContainer.propTypes = {
  component: PropType.element
};

const DashboardContainer = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <div>
          <Header />
          <Component {...matchProps} />
        </div>
      )}
    />
  );
};

const mapStateToProps = state => ({
  state: state // TODO: should map to something afterward
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      redirectLogin: () => push("/login")
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
