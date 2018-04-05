import {GET_ALL_FACULTY} from "../../constants/actions";

export const getAllFacultyAction = (faculty) => ({
  type: GET_ALL_FACULTY,
  faculty
});