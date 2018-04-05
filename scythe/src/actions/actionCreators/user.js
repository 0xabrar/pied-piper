import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_LOGIN_FAILURE,
  GET_FACULTY_GAPF
} from "../../constants/actions";

export const loginSuccess = (payload) => ({
  type: USER_LOGIN,
  payload: payload 
})

export const logoutUser = () => ({
  type: USER_LOGOUT
})

export const loginFailure = () => ({
  type: USER_LOGIN_FAILURE
})

export const getFaultyGAPF = (gapf) => ({
  type: GET_FACULTY_GAPF,
  gapf
})
