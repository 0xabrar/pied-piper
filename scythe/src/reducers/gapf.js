import { GET_ALL_GAPF } from '../constants/actions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GAPF:
      const result = {
        ...state,
        ...action.payload,
      };
      return result;

    default:
      return state;
  }
};
