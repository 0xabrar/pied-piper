import {USER_LOGIN, USER_LOGOUT, USER_LOGIN_FAILURE, GET_FACULTY_GAPF} from '../constants/actions';
const defaultState = {
  token:'',
  user: {
    facultyId: 1,
    personalInfo: {
      firstName: 'Bart',
      lastName: 'Simpson',
    },
    department: 'Computer Scienct',
    type: 'BUDGET_DIRECTOR',
    allotedTickets: 5,
    email: 'bartsimpon@net.com',
    password: 'abc'
  },
  gapf: {}
};

export default (state = defaultState, action) => {
  switch(action.type){
    case USER_LOGIN:
      return {...state,
        token: action.token,
        user: action.user
      }
    case USER_LOGOUT:
      return {
        token: '',
        user: {},
        gapf: {}
    }
    case USER_LOGIN_FAILURE:
      return {
        ...state
      }
    case GET_FACULTY_GAPF:
      return {
        ...state,
        gapf: action.gapf
      }
    default:
      return state;
      
  }
}


