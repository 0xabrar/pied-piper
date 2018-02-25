const path = require('path');
const grpc = require('grpc');

const PROTO_PATH = path.join(__dirname, '/../../common/proto/javelin.proto');
const { javelin } = grpc.load(PROTO_PATH);

const stubTicket = {
  ticketId: 1,
  state: 'INITIAL',
  applicant: {},
  faculty: {},
  notes: [],
};

/**
 * @returns all Tickets stored in the system
 */
const getAllTicketsBackend = ((empty) => { // eslint-disable-line no-unused-vars
  return [stubTicket];
});

/**
 * @returns the Ticket associated with a specific GetTicketRequest
 */
const getTicketBackend = ((getTicketRequest) => {
  const { ticketId } = getTicketRequest;
  return stubTicket;
});

/**
 * @returns the created Ticket
 */
const createTicketBackend = ((createTicketRequest) => {
  const { facultyId, allottedTickets } = createTicketRequest;
  return stubTicket;
});

/**
 * @returns the Ticket associated with a specific GetTicketRequest
 */
const updateTicketBackend = ((modifyTicketRequest) => {
  const { ticketId, state} = modifyTicketRequest;
  return stubTicket;
});

const assignStudentBackend = ((modifyTicketRequest) => {
  const { ticketId, applicant } = modifyTicketRequest;
  return stubTicket;
});

const addNoteBackend = ((modifyTicketRequest) => {
  const { ticketId, note } = modifyTicketRequest;
  return stubTicket;
});

const updateNoteBackend = ((modifyTicketRequest) => {
  const { ticketId, noteRequest } = modifyTicketRequest;
  return stubTicket;
});

const deleteNoteBackend = ((modifyTicketRequest) => {
  const { ticketId, noteId } = modifyTicketRequest;
  return stubTicket;
});


// gRPC doesn't allow using promises of async/await on the server-side, so callbacks are used
const getAllTickets = (call, callback) => callback(null, getAllTicketsBackend(call.request));
const getTicket = (call, callback) => callback(null, getTicketBackend(call.request));
const createTicket = (call, callback) => callback(null, createTicketBackend(call.request));
const updateTicket = (call, callback) => callback(null, updateTicketBackend(call.request));
const assignStudent = (call, callback) => callback(null, assignStudentBackend(call.request));
const addNote = (call, callback) => callback(null, addNoteBackend(call.request));
const updateNote = (call, callback) => callback(null, updateNoteBackend(call.request));
const deleteNote = (call, callback) => callback(null, deleteNoteBackend(call.request));

/**
 * Get a new server with the handler functions in this file bound to the methods
 * it serves.
 * @return {Server} The new server object
 */
function getServer() {
  const server = new grpc.Server();
  server.addService(javelin.Javelin.service, {
    getAllTickets,
    getTicket,
    createTicket,
    updateTicket,
    assignStudent,
    addNote,
    updateNote,
    deleteNote,
  });
  return server;
}

if (require.main === module) {
  // If this is run as a script, start a server on an unused port
  const routeServer = getServer();
  routeServer.bind('0.0.0.0:50053', grpc.ServerCredentials.createInsecure());
  routeServer.start();
}

exports.getServer = getServer;
