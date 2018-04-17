import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_LOGIN_FAILURE
} from "../constants/actions";
import { push } from "react-router-redux";
const defaultState = {
  user: {
    _id: "5ac5be373d838afb2da091f3",
    facultyId: 2,
    personalInfo: {
      firstName: "Vallie",
      lastName: "Cliburn"
    },
    type: "GRAD_STAFF",
    department: "Computer Science",
    email: "vcliburn1@homestead.com"
  },
  status: ""
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: action.payload,
        status: true
      };
    case USER_LOGOUT:
      return {
        ...state,
        token: "",
        user: {},
        status: ""
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        status: false
      };
    default:
      return state;
  }
};
