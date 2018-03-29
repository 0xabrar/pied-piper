import { getAllTicketsAction, addTicketsAction, getTicketAction, updateTicketAction, deleteTicketAction} from "../tickets";
import { ouroborosEndpoint } from "../../constants/services";

export const getAllTicketsThunk = () => async dispatch => {
  try {
    const response = await fetch(`${ouroborosEndpoint}/tickets/`);
    const data = await response.json();
    dispatch(getAllTicketsAction(data.tickets));
  } catch (error) {
    console.log(error);
  }
};


export const addTicketThunk = tickets => async dispatch => {
  try {
    const response = await fetch(`${ouroborosEndpoint}/tickets/`, {
      method: "POST",
      body: tickets
    });
    const data = await response.json();
    dispatch(addTicketsAction(data));
  } catch (error) {
    console.log(error);
  }
};

export const getTicketThunk = ticketId => async dispatch => {
  try {
    const response = await fetch(`${ouroborosEndpoint}/tickets/${ticketId}`);
    const data = await response.json();
    dispatch(getTicketAction(data));
  } catch (error) {
    console.log(error);
  }
};

export const updateTicketThunk = (ticketId, ticketChange) => async dispatch => {
  try {
    const response = await fetch(`${ouroborosEndpoint}/tickets/${ticketId}`, {
      method: "PUT",
      body: ticketChange
    });
    const data = await response.json();
    dispatch(updateTicketAction(data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteTicketThunk = ticketId => async dispatch => {
  try {
    const response = await fetch(`${ouroborosEndpoint}/tickets/${ticketId}`, {
      method: "DELETE"
    });
    const data = await response.json();
    dispatch(deleteTicketAction(data));
  } catch (error) {
    console.log(error);
  }
};
