import {
  ENABLE_NOTES,
  DISABLE_NOTES,
  CONFIRM_ADD_NOTE,
  CONFIRM_DELETE_NOTE,
  CONFIRM_RESOLVE_NOTE
} from "../../constants/actions";

export const enableNotes = () => ({
  type: ENABLE_NOTES
});

export const disableNotes = () => ({
  type: DISABLE_NOTES
});

export const confirmAddNote = text => ({
  type: CONFIRM_ADD_NOTE,
  text
});

export const confirmDeleteNote = index => ({
  type: CONFIRM_DELETE_NOTE,
  index
});

export const confirmResolveNote = (index, note) => ({
  type: CONFIRM_RESOLVE_NOTE,
  index,
  note
});

