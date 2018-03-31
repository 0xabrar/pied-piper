import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import upload from "./upload"
import gapf from './gapf';
import selectedTicket from './notes';
import allTickets from './allTickets'
import tickets from './tickets';

export const getGAPFState = state => state.gapf;
export const getUploadState = state => state.upload;
export const getTicketState = state => state.tickets;

export default combineReducers({
  gapf,
  upload,
  tickets,
  selectedTicket,
  allTickets,
  router: routerReducer,
});
