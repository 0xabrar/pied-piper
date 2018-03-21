import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import gapf from './gapf';
import selectedTicket from './notes';

export const getGAPFState = state => state.gapf;

export default combineReducers({
  gapf,
  selectedTicket,
  router: routerReducer,
});
