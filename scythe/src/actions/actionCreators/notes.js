import { UPDATE_NOTE, RESOLVE_NOTE , ENABLE_NOTES, DISABLE_NOTES, CONFIRM_ADD_NOTE, CONFIRM_DELETE_NOTE} from "../../constants/actions";




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

export const confirmDeleteNote = (index) => {
	return {
		type: CONFIRM_DELETE_NOTE,
		index
	}
}