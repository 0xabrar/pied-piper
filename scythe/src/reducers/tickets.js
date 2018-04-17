import { GET_ALL_TICKETS } from "../constants/actions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TICKETS:
      return [...state, ...action.payload];

    default:
      return state;
  }
};
