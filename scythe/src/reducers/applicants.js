import { GET_ALL_APPLICANTS} from "../constants/actions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_APPLICANTS:
      const result = [
        ...action.applicants
      ];
      return result;

    default:
      return state;
  }
};
