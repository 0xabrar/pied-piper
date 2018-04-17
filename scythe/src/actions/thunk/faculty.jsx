import { getAllTicketsAction } from "../tickets";
import { ouroborosEndpoint } from "../../constants/services";
import { getAllFacultyAction } from "../actionCreators/faculty";

export const getAllFacultyThunk = id => async dispatch => {
  try {
    console.log(`${ouroborosEndpoint}/tickets/`);
    const response = await fetch(`${ouroborosEndpoint}/users/faculty`);
    const data = await response.json();
    console.log("All faculty fetched");
    console.log(data);
    dispatch(getAllFacultyAction(data.faculty));
  } catch (error) {
    console.log(error);
  }
};
