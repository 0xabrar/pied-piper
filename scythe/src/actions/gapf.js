import { GET_ALL_GAPF } from "../constants/actions";

export const getAllGAPFAction = payload => {
  return {
    type: GET_ALL_GAPF,
    payload
  };
};
