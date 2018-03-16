import React from "react";
import PropType from "prop-types";
import { Route } from "react-router";
import Header from "../header";

DefaultLayout.propTypes = {
  component: PropType.element
};

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

export default DefaultLayout;
