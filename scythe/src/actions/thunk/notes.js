import { enableNotes, disableNotes, confirmAddNote, confirmDeleteNote } from '../../actions/actionCreators/notes'
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

export const deleteNoteThunk = (index) => {
	return async (dispatch) => {
		try {
			dispatch(disableNotes())
			//TODO: Make this the correct request
			return fetch('http://localhost:3001' + '/tickets/updateTicket', {method: 'POST', body: null})
				.then((response) => {
						if(response.status === 200){
							console.log("200 recieved")
							dispatch(confirmDeleteNote(index))
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