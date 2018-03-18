import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import counter from "./counter";
import gapf from "./gapf";

export const getGAPFState = state => state.gapf;

export default combineReducers({
  gapf,
  counter,
  router: routerReducer
});
