import {GET_ALL_TICKETS, ADD_TICKETS, GET_TICKET, UPDATE_TICKET, DELETE_TICKET, UPDATE_NOTE, DELETE_NOTE, ENABLE_NOTES, DISABLE_NOTES} from "../constants/actions";

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
  type: DELETE_TICKET,
  payload
});


export const updateNoteAction = payload => ({
  type: UPDATE_NOTE,
  payload
});


export const deleteNoteAction = payload => ({
  type: DELETE_NOTE,
  payload
});

export const enableNotesAction = payload => ({
  type: ENABLE_NOTES,
  payload
});

export const disableNotesAction = payload => ({
  type: DISABLE_NOTES,
  payload
});
