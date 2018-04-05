import {GET_ALL_APPLICANTS} from "../../constants/actions";

export const getAllApplicantsAction = (applicants) => ({
  type: GET_ALL_APPLICANTS,
  applicants
});