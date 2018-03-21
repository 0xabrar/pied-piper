import {ADD_NOTE, CONFIRM_DELETE_NOTE, RESOLVE_NOTE, ENABLE_NOTES, DISABLE_NOTES, CONFIRM_ADD_NOTE} from "../constants/actions";

const defaultState = {
	ticketNumber: 12345,
	status: "PENDING",
	applicant: {
		applicantId: 12345,
		personalInfo: {
			firstName: "Homer",
			lastName: "Simpson",
			phoneNumber: "6045558008",
			email: "homerjsimpson@net.com",
			streetAddress: "101 Evergreen Teresse",
			country: "USA"
		},
		gpa: 4.0
	},
	notes: [
		{
			text: "Hello, world.",
			resolved: false,
			created: new Date().toLocaleString()
		}
	],
	UIEnabled: true
}


const selectedTicket = (state = defaultState, action) => {
	switch (action.type) {
		case RESOLVE_NOTE: {
			return {
				...state,
				selectedTicket: {
					...state.selectedTicket,
					notes: resolveNote(state.selectedTicket.notes, action.index)
				}
			}
		}

		case ENABLE_NOTES:
			return {
				...state,
				UIEnabled: true
			}

		case DISABLE_NOTES:
			return {
				...state,
				UIEnabled: false
		}

		case CONFIRM_ADD_NOTE:
			return {
				...state,
				notes: [...state.notes, createNote(action.text)]
			}

		case CONFIRM_DELETE_NOTE: {
			return {
				...state,
				notes: state.notes.filter((note, i) => i !== action.index)
			}
		}

		default:
			return state
	}
}

const createNote = (text) => {
	return {
		text,
		created: new Date().toLocaleString(),
		resolved: false
	}
}

const resolveNote = (notes, index) => {
	return (
		//TODO: Will this return copy?
		notes[index].resolved = true
	)
}

export default selectedTicket






