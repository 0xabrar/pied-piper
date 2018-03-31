import {ENABLE_TICKETS, DISABLE_TICKETS, LOAD_TICKETS} from "../../constants/actions";

export const enableTickets = () => ({
  type: ENABLE_TICKETS
});

export const disableTickets = () => ({
  type: DISABLE_TICKETS
});

export const loadTickets = (tickets) => ({
  type: LOAD_TICKETS,
  tickets
});