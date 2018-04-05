import {
  loginSuccess,
  loginFailure,
  getFaultyGAPF
} from "../actionCreators/user";
import { ouroborosEndpoint } from "../../constants/services";
import { push } from "react-router-redux";


function JSON_to_URLEncoded(element,key,list){
  var list = list || [];
  if(typeof(element)=='object'){
    for (var idx in element)
      JSON_to_URLEncoded(element[idx],key?key+'['+idx+']':idx,list);
  } else {
    list.push(key+'='+encodeURIComponent(element));
  }
  return list.join('&');
}

export const loginThunk = loginInfo => async dispatch => {
  console.log("Logging in...");
  try {
    const response = await fetch(`${ouroborosEndpoint}/authenticate`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON_to_URLEncoded(loginInfo) 
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      if (data.success === false) {
        dispatch(loginFailure());
      }
      dispatch(loginSuccess(data));
      dispatch(push("/dashboard"));
    } else {
      console.log("Login failure");
      dispatch(loginFailure());
    }
  } catch (error) {
    console.log(error);
  }
};

export const getFacultyGAPFThunk = facultyId => dispatch => {
  return fetch(`${ouroborosEndpoint}/gapf/get/${facultyId}`)
    .then(response => {
      if (response.status === 200) {
        dispatch(getFaultyGAPF(response.body));
      } else {
        console.log(response.statusText);
      }
    })
    .catch(err => {
      console.log(err);
    });
};
