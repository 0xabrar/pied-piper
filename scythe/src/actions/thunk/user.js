import{
  loginSuccess,
  loginFailure
} from "../actionCreators/user";
import { ouroborosEndpoint } from "../../constants/services";

export const loginThunk = loginInfo => (dispatch) => {
  return fetch(`${ouroborosEndpoint}/authenticate`, {method: 'POST', body: loginInfo })
    .then((response) => {
      if (response.status === 200){
        dispatch(loginSuccess(response.body))
      } else{
        console.log(response.statusText);
        dispatch(loginFailure())
      }
    } ).catch((err) => {
      console.log(err)
      dispatch(loginFailure())
    })
}