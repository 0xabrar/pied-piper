// Ticket types
export const INTERNATIONAL = 'INTERNATIONAL'
export const DOMESTIC = 'DOMESTIC'

// Ticket states
export const INITIAL_STATE = 'INITIAL_STATE'
export const GRANTED_STATE = 'GRANTED_STATE'
export const REQUESTED_STATE = 'REQUESTED_STATE'
export const PENDING_STATE = 'PENDING_STATE'
export const REFUSED_STATE = 'REFUSED_STATE'
export const ACCEPTED_STATE = 'ACCEPTED STATE'

export const stateToTitle = {
  INITIAL_STATE: 'Initial Tickets',
  GRANTED_STATE: 'Granted Tickets',
  REQUESTED_STATE: 'Requested Tickets',
  PENDING_STATE: 'Pending Tickets',
  REFUSED_STATE: 'Refused Tickets',
  ACCEPTED_STATE: 'Accepted Tickets'
}