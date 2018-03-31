import {disableNotes, enableNotes} from "../actionCreators/notes";
import {ouroborosEndpoint} from "../../constants/services";

export const approveOfferProposalThunk = text => (dispatch) => {
  //TODO: POST the correct data + endpoint
  dispatch(disableTickets());
  return fetch(`${ouroborosEndpoint}/tickets/updateTicket`, { method: 'POST', body: text })
    .then((response) => {
      if (response.status === 200) {
        dispatch(confirmApproveProposal(text));
      } else {
        console.log(response.statusText);
      }
      dispatch(enableTickets());
    }).catch((err) => {
      console.log(err);
      dispatch(enableTickets());
    });
};