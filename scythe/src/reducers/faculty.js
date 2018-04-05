import { GET_ALL_FACULTY } from "../constants/actions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FACULTY:
      const result = [
        ...action.faculty
      ];
      return result;

    default:
      return state;
  }
};
