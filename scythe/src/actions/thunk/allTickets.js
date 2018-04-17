import { ouroborosEndpoint } from "../../constants/services";
import {
  disableTickets,
  enableTickets,
  loadTickets
} from "../actionCreators/allTickets";
import { getAllTicketsThunk } from "./tickets";
import { updateTicketAction } from "../tickets";
import { updateTicketThunk } from "../thunk/tickets";
import {
  ACCEPTED_STATE,
  GRANTED_STATE,
  PENDING_STATE,
  REFUSED_STATE,
  REQUESTED_STATE
} from "../../constants/tickets";

export const grantTicketThunk = (ticketId, facultyId) => dispatch => {
  dispatch(disableTickets());
  updateTicketThunk(ticketId, { state: GRANTED_STATE, facultyId: facultyId });
  dispatch(enableTickets());
};

export const approveOfferProposalThunk = ticketId => dispatch => {
  dispatch(disableTickets());
  updateTicketThunk(ticketId, { state: PENDING_STATE });
  dispatch(enableTickets());
};

export const assignApplicantThunk = (ticketId, appId) => dispatch => {
  dispatch(disableTickets());
  updateTicketThunk(ticketId, { state: REQUESTED_STATE, applicantId: appId });
  dispatch(enableTickets());
};

export const approveApplicantThunk = ticketId => dispatch => {
  dispatch(disableTickets());
  updateTicketThunk(ticketId, { state: PENDING_STATE });
  dispatch(enableTickets());
};
export const confirmAcceptanceThunk = ticketId => dispatch => {
  dispatch(disableTickets());
  updateTicketThunk(ticketId, { state: ACCEPTED_STATE });
  dispatch(enableTickets());
};
export const confirmDeclineThunk = ticketId => dispatch => {
  dispatch(disableTickets());
  updateTicketThunk(ticketId, { state: REFUSED_STATE });
  dispatch(enableTickets());
};
