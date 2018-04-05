import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_LOGIN_FAILURE
} from "../../constants/actions";

export const loginSuccess = (request) => ({
  type: USER_LOGIN,
  payload: request.decoded
})

export const logoutUser = () => ({
  type: USER_LOGOUT
})

export const loginFailure = () => ({
  type: USER_LOGIN_FAILURE
})