import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import selectedTicket from './notes'

export default combineReducers({
  selectedTicket,
  routerReducer
});
