import React from "react";
import PropType from "prop-types";
import DefaultLayout from "./defaultLayout";
import Sidebar from "../sidebar";
import { Grid } from "semantic-ui-react";

DashboardLayout.propTypes = {
  component: PropType.element
};

const DashboardLayout = ({ component: Component, ...rest }) => {
  return (
    <DefaultLayout
      {...rest}
      component={matchProps => (
        <Grid celled>
          <Grid.Column width={2}>
            <Sidebar />
          </Grid.Column>
          <Grid.Column width={14}>
            <Component {...matchProps} />
          </Grid.Column>
        </Grid>
      )}
    />
  );
};

export default DashboardLayout;
