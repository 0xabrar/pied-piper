import {updateNoteAction, deleteNoteAction, disableNotesAction, enableNotesAction} from "../tickets";
import {updateNoteThunk, deleteNoteThunk} from '../thunk/tickets'

/*export const approveOfferProposalThunk = text => (dispatch) => {
  // TODO: Is this the correct method for approval etc?
  dispatch(disableTickets());
  return fetch(`${ouroborosEndpoint}/tickets/updateTicket`, { method: 'POST', body: text })
    .then((response) => {
      if (response.status === 200) {
        getAllTicketsThunk()
      } else {
        console.log(response.statusText);
      }
      dispatch(enableTickets());
    }).catch((err) => {
      console.log(err);
      dispatch(enableTickets());
    });
};*/

export const updateNoteSafeThunk = (ticketId, noteId, resolved) => dispatch => {
  dispatch(disableNotesAction())
  updateNoteThunk(ticketId, noteId, resolved)
  dispatch(enableNotesAction())
}

export const deleteNoteSafeThunk = (ticketId, noteId) => dispatch => {
  dispatch(disableNotesAction())
  updateNoteThunk(ticketId, noteId)
  dispatch(enableNotesAction())
}
