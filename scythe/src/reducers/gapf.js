import { GET_ALL_GAPF } from "../constants/actions";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GAPF:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};
