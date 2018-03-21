import {
  incrementAction,
  incrementRequestedAction,
  decrementAction,
  decrementRequestedAction
} from "../counter";

export const incrementAsync = () => {
  return dispatch => {
    dispatch(incrementRequestedAction);

    return setTimeout(() => {
      dispatch(incrementAction);
    }, 3000);
  };
};

export const decrementAsync = () => {
  return dispatch => {
    dispatch(decrementRequestedAction);
    return setTimeout(() => {
      dispatch(decrementAction);
    }, 3000);
  };
};

export const increment = () => {
  return dispatch => {
    dispatch(incrementRequestedAction);
    dispatch(incrementAction);
  };
};

export const decrement = () => {
  return dispatch => {
    dispatch(decrementRequestedAction);
    dispatch(decrementAction);
  };
};
