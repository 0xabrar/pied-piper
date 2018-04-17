import { uploadSuccess, uploadFail } from "../actionCreator/upload";
import { ouroborosEndpoint } from "../../constants/services";

export const postFileThunk = file => dispatch => {
  //TODO: put the correct endpoint in
  return fetch(`${ouroborosEndpoint}/gapf/submit`, {
    method: "POST",
    body: file
  })
    .then(response => {
      if (response.status == 200) {
        dispatch(uploadSuccess());
      } else {
        console.log(response.statusText);
        dispatch(uploadFail());
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(uploadFail());
    });
};
