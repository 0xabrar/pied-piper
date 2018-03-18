import React from "react";
import PropType from "prop-types";
import { Route } from "react-router";
import Header from "../header";

const DefaultLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <div className="default-layout">
          <Header />
          <Component {...matchProps} />
        </div>
      )}
    />
  );
};

DefaultLayout.propTypes = {
  component: PropType.func
};

export default DefaultLayout;
