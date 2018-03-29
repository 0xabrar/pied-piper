import {GET_ALL_TICKETS, ADD_TICKETS, GET_TICKET, UPDATE_TICKET, DELETE_TICKET} from "../constants/actions";

export const getAllTicketsAction = payload => ({
  type: GET_ALL_TICKETS,
  payload
});
export const addTicketsAction = payload => ({
  type: ADD_TICKETS,
  payload
});

export const getTicketAction = payload => ({
  type: GET_TICKET,
  payload
});

export const updateTicketAction = payload => ({
  type: UPDATE_TICKET,
  payload
});

export const deleteTicketAction = payload => ({
  type: UPDATE_TICKET,
  payload
});
