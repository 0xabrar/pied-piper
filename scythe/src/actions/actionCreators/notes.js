import {ADD_NOTE, UPDATE_NOTE, RESOLVE_NOTE, DELETE_NOTE, ENABLE_NOTES, DISABLE_NOTES, CONFIRM_ADD_NOTE} from "../../constants/actions";



export const addNote = (text) => {
	return{
		type: ADD_NOTE,
		text
	}
}

/*export const updateNote = (text, index) => {
	return({
		type: UPDATE_NOTE,
		text,
		index
	})
}

export const deleteNote = (index) => {
	return({
		type: DELETE_NOTE,
		index
	})
}

export const resolveNote = (index) => {
	return({
		type: RESOLVE_NOTE,
		index
	})
}*/

export const enableNotes = () => {
	return {
		type: ENABLE_NOTES
	}
}

export const disableNotes = () => {
	return {
		type: DISABLE_NOTES
	}
}

export const confirmAddNote = (text) => {
	return {
		type: CONFIRM_ADD_NOTE,
		text
	}
}