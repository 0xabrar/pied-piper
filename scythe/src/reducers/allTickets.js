import {
  DISABLE_TICKETS,
  ENABLE_TICKETS,
  LOAD_TICKETS,
  UPDATE_SELECTED_TICKET
} from "../constants/actions";
import { FACULTY_USER } from "../constants/users";

const defaultState = {
  tickets: [
    {
      ticketId: "5ac5cb9c3d838afb2da67cc7",
      state: "GRANTED",
      type: "DOMESTIC",
      faculty: {
        facultyId: 1,
        personalInfo: {
          firstName: "Karine",
          lastName: "Casier"
        },
        department: "Computer Science",
        type: "GRAD_STAFF",
        email: "kcasier0@themeforest.net",
        domesticTickets: 0,
        internationalTickets: 0
      },
      applicant: {
        applicantId: 1,
        personalInfo: {
          firstName: "Saidee",
          lastName: "Bufton"
        }
      },
      created: 266896808,
      lastModified: 1522913891,
      notes: []
    }
  ],
  UIEnabled: true,
  selectedTicket: {
    ticketId: "5ac5cb9c3d838afb2da67cc7",
    state: "GRANTED",
    type: "DOMESTIC",
    faculty: {
      facultyId: 1,
      personalInfo: {
        firstName: "Karine",
        lastName: "Casier"
      },
      department: "Computer Science",
      type: "GRAD_STAFF",
      email: "kcasier0@themeforest.net",
      domesticTickets: 0,
      internationalTickets: 0
    },
    applicant: {
      applicantId: 1,
      personalInfo: {
        firstName: "Saidee",
        lastName: "Bufton"
      }
    },
    created: 266896808,
    lastModified: 1522913891,
    notes: []
  }
};

// TODO: Is this a logical name?
const allTickets = (state = defaultState, action) => {
  switch (action.type) {
    case ENABLE_TICKETS:
      return {
        ...state,
        UIEnabled: true
      };
    case DISABLE_TICKETS:
      return {
        ...state,
        UIEnabled: false
      };
    case LOAD_TICKETS:
      return {
        ...state,
        tickets: action.tickets
      };
    case UPDATE_SELECTED_TICKET:
      return {
        ...state,
        selectedTicket: action.ticket
      };
    default:
      return state;
  }
};

export default allTickets;
