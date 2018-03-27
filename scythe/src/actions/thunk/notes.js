import {
  enableNotes,
  disableNotes,
  confirmAddNote,
  confirmDeleteNote,
  confirmResolveNote
} from "../../actions/actionCreators/notes";
import { ouroborosEndpoint } from "../../constants/services";
import { getResolvedNote } from "../../reducers/notes";

export const addNoteThunk = text => async dispatch => {
  try {
    console.log(ouroborosEndpoint);
    dispatch(disableNotes());
    return fetch(`${ouroborosEndpoint}/tickets/updateTicket`, {
      method: "POST",
      body: text
    }).then(response => {
      if (response.status === 200) {
        dispatch(confirmAddNote(text));
      } else {
        console.log(response.statusText);
      }
      dispatch(enableNotes());
    });
  } catch (error) {
    console.log(error);
    dispatch(enableNotes());
  }
};

export const deleteNoteThunk = (index, note, ticket) => async dispatch => {
  try {
    dispatch(disableNotes());
    return fetch(`${ouroborosEndpoint}/tickets/updateTicket`, {
      method: "POST",
      body: deleteNote(index, ticket)
    }).then(response => {
      if (response.status === 200) {
        dispatch(confirmDeleteNote(index));
      } else {
        console.log(response.statusText);
      }
      dispatch(enableNotes());
    });
  } catch (error) {
    console.log(error);
    dispatch(enableNotes());
  }
};

export const resolveNoteThunk = (index, note, ticket) => async dispatch => {
  try {
    console.log(ouroborosEndpoint);
    dispatch(disableNotes());
    return fetch(`${ouroborosEndpoint}/tickets/updateTicket`, {
      method: "POST",
      body: resolveNote(index, note, ticket)
    }).then(response => {
      if (response.status === 200) {
        dispatch(confirmResolveNote(index, note));
      } else {
        console.log(response.statusText);
      }
      dispatch(enableNotes());
    });
  } catch (error) {
    console.log(error);
    dispatch(enableNotes());
  }
};

// Returns a new ticket obj with the note marked as resolved
const resolveNote = (index, note, ticket) => ({
  ...ticket,
  notes: [...ticket.notes.filter(i => i !== index), getResolvedNote(note)]
});

// Returns a new ticket obj with the note deleted
const deleteNote = (index, ticket) => ({
  ...ticket,
  notes: [...ticket.notes.filter(i => i !== index)]
});
