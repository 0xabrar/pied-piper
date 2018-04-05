import {getAllAction} from "../tickets";
import {ouroborosEndpoint} from "../../constants/services";
import {getAllApplicantsAction} from "../actionCreators/applicants";

export const getAllApplicantsThunk = (id) => async dispatch => {
  try {
    console.log(`${ouroborosEndpoint}/tickets/`)
    const response = await fetch(`${ouroborosEndpoint}/users/applicant`);
    const data = await response.json();
    console.log('All faculty fetched')
    console.log(data)
    dispatch(getAllApplicantsAction(data.applicants));
  } catch (error) {
    console.log(error);
  }
};