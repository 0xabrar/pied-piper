import { enableNotes, disableNotes, confirmAddNote } from '../../actions/actionCreators/notes'
require('whatwg-fetch')


export const addNoteThunk = (text) => {
	return async (dispatch) => {
		try {
			dispatch(disableNotes())
			return fetch('http://localhost:3001' + '/tickets/updateTicket', {method: 'POST', body: text})
					.then((response) => {
					if(response.status === 200){
						console.log("200 recieved")
						dispatch(confirmAddNote(text))
					}
					else{
						console.log(response.statusText)
					}
					dispatch(enableNotes())
				}
			)
		}
		catch (error) {
			console.log(error)
		}
	}
};