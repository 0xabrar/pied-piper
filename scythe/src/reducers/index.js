import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import upload from "./upload"
import gapf from './gapf';
import allTickets from './allTickets'
import selectedTicket from './selectedTicket'
import tickets from './tickets';
import user from './user';
import faculty from './faculty'
import applicants from './applicants'

export const getGAPFState = state => state.gapf;
export const getUploadState = state => state.upload;
export const getTicketState = state => state.tickets;
export const getTicket = state => state.selectedTicket;
export const getUserState = state => state.user;

export default combineReducers({
  gapf,
  upload,
  tickets,
  selectedTicket,
  allTickets,
  user,
  faculty,
  applicants,
  router: routerReducer,
});
