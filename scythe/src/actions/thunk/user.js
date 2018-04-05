import{loginSuccess, loginFailure, getFaultyGAPF} from "../actionCreators/user";
import { ouroborosEndpoint } from "../../constants/services";
import {getAllTicketsThunk} from "./tickets";
import { push } from "react-router-redux";


export const loginThunk = loginInfo => (dispatch) => {
  console.log('Logging in...')
  return fetch(`${ouroborosEndpoint}/authenticate`, {method: 'POST', body: loginInfo })
    .then((response) => {

      if (response.status === 200){
        if (response.body.success === false){
          console.log(response.statusText);
          dispatch(loginFailure())
        }
        dispatch(loginSuccess(response.decoded))
        dispatch(push("Dashboard"))
      } else{
        console.log(response.statusText);
        dispatch(loginFailure())
      }

  })
}

export const getFacultyGAPFThunk = (facultyId) => dispatch => {
  return fetch(`${ouroborosEndpoint}/gapf/get/${facultyId}`).then((response) => {
      if(response.status === 200){
        dispatch(getFaultyGAPF(response.body))
      } else {
        console.log(response.statusText)
      }
    }
  ).catch((err) => {
    console.log(err)
  })
}