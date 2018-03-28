import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import upload from "./upload"
import gapf from './gapf';
import selectedTicket from './notes';

export const getGAPFState = state => state.gapf;
export const getUploadState = state => state.upload;

export default combineReducers({
  gapf,
  upload,
  selectedTicket,
  router: routerReducer,
});
