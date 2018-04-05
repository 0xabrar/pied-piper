import {USER_LOGIN, USER_LOGOUT, USER_LOGIN_FAILURE} from '../constants/actions';
/*const defaultState={
  user: {
    facultyId: 1,
    department: 'Computer Science',
    type: 'FACULTY',
    email: 'bartsimpon@net.com'
  },
  status: ''
};*/
const defaultState = {}

export default (state=defaultState, action) => {
  switch(action.type){
    case USER_LOGIN:
      return {...state,
        user: action.payload,
      status: true
  }
case USER_LOGOUT:
    return {...state,
      token: '',
    user: {},
  status: ''
}
case USER_LOGIN_FAILURE:
    return {
      ...state,
      status: false
}
default:
  return state;
}

}
