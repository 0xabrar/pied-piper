import { getAllGAPFAction } from "../gapf";
import { ouroborosEndpoint } from "../../constants/services";

export const getAllGAPFThunk = () => dispatch => {
  return fetch(`${ouroborosEndpoint}/gapf/all`)
    .then(response => {
      dispatch(getAllGAPFAction(response.json()));
    })
    .catch(error => {
      console.log(error);
    });
};
