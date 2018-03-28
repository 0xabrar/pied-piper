import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import counter from "./counter";
import gapf from "./gapf";
import upload from "./upload"

import selectedTicket from './notes';

export const getGAPFState = state => state.gapf;
export const getUploadState = state => state.upload;

export default combineReducers({
  gapf,
  upload,
  counter,
  selectedTicket,
  router: routerReducer
});
