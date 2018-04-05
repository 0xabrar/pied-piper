import {UPDATE_NOTE, DELETE_NOTE, DISABLE_NOTES, ENABLE_NOTES} from "../constants/actions";
import {FACULTY_USER} from "../constants/users";


const defaultState = {
  ticket: {
    ticketId:"5ac5cb9c3d838afb2da67cc7",
    state:"GRANTED",
    type:"DOMESTIC",
    faculty:{
      facultyId:1,
      personalInfo:{
        firstName:"Karine",
        lastName:"Casier"
      },
      department:"Computer Science",
      type:"GRAD_STAFF",
      email:"kcasier0@themeforest.net",
      domesticTickets:0,
      internationalTickets:0
    },
    applicant:{
      applicantId:1,
      personalInfo:{
        firstName:"Saidee",
        lastName:"Bufton"
      }
    },
    created:266896808,
    lastModified:1522913891,
    notes:[]
  },

  UIEnabled: true
};

const selectedTicket = (state = defaultState, action) => {
  switch (action.type) {
    case ENABLE_NOTES:
      return {
        ...state,
        UIEnabled: true
      }
    case DISABLE_NOTES:
      return {
        ...state,
        UIEnabled: false
      }
    case UPDATE_NOTE:
      return {
        ...state,
        ticket: action.ticket
      }
    case DELETE_NOTE:
    return {
      ...state,
      ticket: action.ticket
    }
    default:
      return state;
  }
};

export default selectedTicket
