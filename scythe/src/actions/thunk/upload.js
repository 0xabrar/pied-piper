import { uploadSuccess, uploadFail } from "../actionCreator/upload";

export const postFileThunk = file => {
  return async dispatch => {
    try {
      //TODO: put the correct endpoint in
      await fetch(`endpoint`, {
        method: "POST",
        body: file
      });
      dispatch(uploadSuccess());
    } catch (error) {
      console.error(error);
      dispatch(uploadFail);
    }
  };
};
