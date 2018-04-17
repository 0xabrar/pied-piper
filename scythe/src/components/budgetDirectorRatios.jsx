import React from "react";
import ApplicantRatio from "../containers/applicantRatio";
import {
  ACCEPTED_STATE,
  GRANTED_STATE,
  INITIAL_STATE
} from "../constants/tickets";

const style = {
  rootDiv: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr"
  }
};

class BudgetDirectorRatios extends React.Component {
  render() {
    return (
      <div style={style.rootDiv}>
        <ApplicantRatio state={INITIAL_STATE} />
        <ApplicantRatio state={GRANTED_STATE} />
        <ApplicantRatio state={ACCEPTED_STATE} />
      </div>
    );
  }
}

export default BudgetDirectorRatios;
