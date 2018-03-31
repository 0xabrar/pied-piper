import {DISABLE_TICKETS, ENABLE_TICKETS, LOAD_TICKETS} from "../constants/actions";
import {FACULTY_USER} from "../constants/users";

const defaultState = {
  tickets: [
    {
      ticketId: 12345,
      state: 'INITIAL',
      applicantId: 121212,
      facultyId: 232323,
      notes: [
        {
          text: 'Hello, world.',
          resolved: false,
          created: new Date().toLocaleString(),
        },
      ],
      created: new Date().toLocaleString(),
      lastModified: new Date().toLocaleString()
    }
  ],
  UIEnabled: true
};

// TODO: Is this a logical name?
const allTickets = (state = defaultState, action) => {
  switch (action.type) {
    case ENABLE_TICKETS:
      return {
        ...state,
        UIEnabled: true
      }
    case DISABLE_TICKETS:
      return {
        ...state,
        UIEnabled: false
      }
    case LOAD_TICKETS:
      return {
        ...state,
        tickets: action.tickets
      }
    default:
      return state;
  }
};

export default allTickets