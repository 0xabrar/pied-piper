import {
  updateNoteAction,
  deleteNoteAction,
  disableNotesAction,
  enableNotesAction
} from "../tickets";
import { updateNoteThunk, deleteNoteThunk } from "../thunk/tickets";

export const updateNoteSafeThunk = (ticketId, noteId, resolved) => dispatch => {
  dispatch(disableNotesAction());
  updateNoteThunk(ticketId, noteId, resolved);
  dispatch(enableNotesAction());
};

export const deleteNoteSafeThunk = (ticketId, noteId) => dispatch => {
  dispatch(disableNotesAction());
  updateNoteThunk(ticketId, noteId);
  dispatch(enableNotesAction());
};
