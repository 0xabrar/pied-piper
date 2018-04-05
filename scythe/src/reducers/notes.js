import {
  ADD_NOTE,
  CONFIRM_DELETE_NOTE,
  RESOLVE_NOTE,
  ENABLE_NOTES,
  DISABLE_NOTES,
  CONFIRM_ADD_NOTE,
  CONFIRM_RESOLVE_NOTE, UPDATE_SELECTED_TICKET
} from "../constants/actions";

const defaultState = {
  applicant: {
    applicantId: 12345,
    personalInfo: {
      firstName: 'Homer',
      lastName: 'Simpson',
      phoneNumber: '6045558008',
      email: 'homerjsimpson@net.com',
      streetAddress: '101 Evergreen Teresse',
      country: 'USA'
    },
    gpa: 4
  },
  notes: [],
  UIEnabled: true,
  ticketId: '5ac30cd80065ed0041f52ed5',
  state: 'INITIAL',
  applicantId: '-1',
  facultyId: '1',
  created: '1522732249',
  lastModified: '1522732249'
};

const selectedTicket = (state = defaultState, action) => {
  switch (action.type) {
    case ENABLE_NOTES:
      return {
        ...state,
        UIEnabled: true
      };

    case DISABLE_NOTES:
      return {
        ...state,
        UIEnabled: false
      };

    case CONFIRM_ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, createNote(action.text)]
      };

    case CONFIRM_DELETE_NOTE: {
      return {
        ...state,
        notes: state.notes.filter((note, i) => i !== action.index)
      };
    }

    case CONFIRM_RESOLVE_NOTE: {
      return {
        ...state,
        notes: [
          ...state.notes.filter((note, i) => i !== action.index),
          getResolvedNote(action.note)
        ]
      };
    }

    case UPDATE_SELECTED_TICKET: {
      return {
        ...state,
        ...action.ticket
      }
    }

    default:
      return state;
  }
};

const createNote = text => ({
  text,
  created: new Date().toLocaleString(),
  resolved: false
});

export const getResolvedNote = note => ({
  ...note,
  resolved: true
});

export default selectedTicket;
