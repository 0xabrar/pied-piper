import {
  UPDATE_LINK,
  UPLOAD_SUCCESS,
  UPLOAD_FAIL
} from "../../constants/actions";

export const updateLink = link => ({
  type: UPDATE_LINK,
  payload: link
});

export const uploadSuccess = () => ({
  type: UPLOAD_SUCCESS
});

export const uploadFail = () => ({
  type: UPLOAD_FAIL
});
