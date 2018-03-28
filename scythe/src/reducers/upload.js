import { UPDATE_LINK, UPLOAD_SUCCESS, UPLOAD_FAIL } from "../constants/actions";

const defaultState = {
  fileToBeSent: "",
  filePreview: "",
  printingmessage: ""
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_LINK:
      return {
        ...state,
        fileToBeSent: action.payload,
        filePreview: action.payload,
        printmessage: ""
      };

    case UPLOAD_SUCCESS:
      return {
        ...state,
        fileToBeSent: "",
        printingmessage: "Succesfully uploaded file"
      };

    case UPLOAD_FAIL:
      return {
        ...state,
        printingmessage: "Failed to upload file"
      };

    default:
      return state;
  }
};
