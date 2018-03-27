import { getAllGAPFAction } from "../gapf";
import { ouroborosEndpoint } from "../../constants/services";

export const getAllGAPFThunk = () => async dispatch => {
  try {
    const response = await fetch(`${ouroborosEndpoint}/gapf/all`);
    const data = await response.json();
    dispatch(getAllGAPFAction(data));
  } catch (error) {
    console.log(error);
  }
};
