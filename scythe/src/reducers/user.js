import {USER_LOGIN, USER_LOGOUT, USER_LOGIN_FAILURE} from '../constants/actions';
const defaultState = {
  token:'',
  user: {
    facultyId: 1,
    personalInfo: {
      firstName: 'Bart',
      lastName: 'Simpson',
    },
    department: 'Computer Scienct',
    type: 'ASSOCIATE_CHAIR',
    allotedTickets: 5,
    email: 'bartsimpon@net.com',
    password: 'abc'
  }
};

const user = (state = defaultState, action) => {
  switch(action.type){
    case USER_LOGIN:
      return {...state,
        token: action.token,
        user: action.user
      }
    case USER_LOGOUT:
      return {
        token: '',
        user: {}
    }
    case USER_LOGIN_FAILURE:
      return {
        ...state
      }
    default:
      return state;
      
  }
}

export default user

