import { SERVICE_NAMES, SERVICE_PORTS, MONGO_CONFIG } from '../common/config';
import logger from "./logger";

const path = require('path');
const grpc = require('grpc');
const mongoose = require('mongoose');

const PROTO_PATH = path.join(__dirname, '/../../common/proto/javelin.proto');
const { javelin } = grpc.load(PROTO_PATH);

const Ticket = require('./models/ticket.js');
const Note = require('./models/note.js')

mongoose.connect(MONGO_CONFIG.HOST);

const formatNote = (note) => {
  return {
    noteId: note._id.toString(),
    text: note.text,
    resolved: note.resolved,
    created: note.created.getTime(),
    lastModified: note.lastModified.getTime(),
  };
}

const formatTicket = (ticket) => {
  return {
    ticketId: ticket._id.toString(),
    state: ticket.state,
    type: ticket.type,
    facultyId: ticket.facultyId,
    applicantId: ticket.applicantId,
    created: ticket.created.getTime(),
    lastModified: ticket.lastModified.getTime(),
    notes: ticket.notes.map(formatNote)
  }
}

/**
 * @returns list of tickets that match getTicketRequest's attributes
 */
export const getTicketsBackend = ((getTicketRequest, callback) => { // eslint-disable-line no-unused-vars
  logger.info("Enter getTicketsBackend with query params %j", getTicketRequest);
  let query = {};
  if (getTicketRequest.ticketId){
    query._id = getTicketRequest.ticketId;
  }
  if (getTicketRequest.facultyId >= 0){
    query.facultyId = getTicketRequest.facultyId;
  }
  if (getTicketRequest.state){
    query.state = getTicketRequest.state;
  }
  if (getTicketRequest.type){
    query.type = getTicketRequest.type;
  }
  Ticket.find(query).populate('notes').exec(function(err, tickets) {
    if (err) { 
      logger.error("Error: %j", err);
      callback(err, null);
    }
    logger.info("DB response with data: %j", tickets);
    let payload = tickets.map(formatTicket);
    logger.info("Response payload data: %j", payload);
    callback(null, payload);
  });
});

/**
 * @returns the created Ticket
 */
export const createTicketBackend = ((createTicketRequest, callback) => {
  logger.info("Enter createTicketBackend with request body %j", createTicketRequest);
  let now = Math.round((new Date()).getTime()/1000);
  let tickets = [];
  for (let i = 0; i < createTicketRequest.domesticTickets; i++){
    tickets.push(new Ticket({
      state: 'INITIAL',
      type: 'DOMESTIC',
      facultyId: createTicketRequest.facultyId,
      applicantId: -1,
      created: now,
      lastModified: now,
      notes: []
    }));
  }
  for (let i = 0; i < createTicketRequest.internationalTickets; i++){
    tickets.push(new Ticket({
      state: 'INITIAL',
      type: 'INTERNATIONAL',
      facultyId: createTicketRequest.facultyId,
      applicantId: -1,
      created: now,
      lastModified: now,
      notes: []
    }));
  }
  logger.info("Tickets to be added to Ticket collection %j", tickets);
  Ticket.insertMany(tickets, (err, newTickets) => {
    if (err){
      logger.error("Error: %j", err);
      callback(err, null);
    }
    logger.info("DB response with data: %j", newTickets);
    let payload = newTickets.map(formatTicket);
    logger.info("Response payload data: %j", payload);
    callback(null, payload);
  });
});

/**
 * @returns the Ticket associated with a specific GetTicketRequest
 */
export const updateTicketBackend = ((modifyTicketRequest, callback) => {
  logger.info("Enter updateTicketBackend with request body %j", modifyTicketRequest);
  let now = Math.round((new Date()).getTime()/1000);
  Ticket.findOneAndUpdate({_id: modifyTicketRequest.ticketId}, 
    {state: modifyTicketRequest.state, lastModified: now}, {new: true}).populate('notes').exec(function(err, ticket) {
      if (err){
        logger.error("Error: %j", err);
        callback(err, null);
      }
      logger.info("DB response with data: %j", ticket);
      let payload = formatTicket(ticket);
      logger.info("Response payload data: %j", payload);
      callback(null, payload);
  });
});

/**
 * @returns an error or success message
 */
export const deleteTicketBackend = ((deleteTicketRequest, callback) => {
  logger.info("Enter deleteTicketBackend with request body %j", deleteTicketRequest);
  Ticket.findOneAndRemove({_id: deleteTicketRequest.ticketId}, (err) => {
    if (err){
      logger.error("Error: %j", err);
      callback(err, null);
    }
    let payload = {message: ("Ticket " + deleteTicketRequest.ticketId + " successfully removed")};
    logger.info("Response payload data: %j", payload);
    callback(null, payload);
  });
});

/**
 * @returns the Ticket associated with a specific modifyTicketRequest
 */
export const assignApplicantBackend = ((modifyTicketRequest, callback) => {
  logger.info("Enter assignApplicantBackend with request body %j", modifyTicketRequest);
  let now = Math.round((new Date()).getTime()/1000);
  Ticket.findOneAndUpdate({_id: modifyTicketRequest.ticketId}, 
      {applicantId: modifyTicketRequest.applicantId, lastModified: now}, {new: true}).populate('notes').exec(function(err, ticket) {
        if (err){
          logger.error("Error: %j", err);
          callback(err, null);
        }
        logger.info("DB response with data: %j", ticket);
        let payload = formatTicket(ticket);
        logger.info("Response payload data: %j", payload);
        callback(null, payload);
  });
});

/**
 * @returns the Ticket associated with a specific addNoteRequest
 */
export const addNoteBackend = ((addNoteRequest, callback) => {
  logger.info("Enter addNoteBackend with request body %j", addNoteRequest);
  let now = Math.round((new Date()).getTime()/1000);
  var newNote = new Note({
    text: addNoteRequest.text,
    created: now,
    lastModified: now,
    resolved: false
  });
  logger.info("Note to be added to Note collection %j", newNote);
  newNote.save((err, note) => {
    if (err){
      logger.error("Error: %j", err);
      callback(err, null);
    } else {
      logger.info("DB response with data: %j", note);
      Ticket.findOneAndUpdate({_id: addNoteRequest.ticketId}, 
          {$push: {notes: note._id}, lastModified: now}, {new: true}).populate('notes').exec(function(err, ticket) {
            if (err){
              logger.error("Error: %j", err);
              callback(err, null);
            }
            logger.info("DB response with data: %j", ticket);
            let payload = formatTicket(ticket);
            logger.info("Response payload data: %j", payload);
            callback(null, payload);
      }
    )}
  });
});

/**
 * @returns the Note associated with a specific updateNoteRequest
 */
export const updateNoteBackend = ((updateNoteRequest, callback) => {
  logger.info("Enter updateNoteBackend with request body %j", updateNoteRequest);
  let now = Math.round((new Date()).getTime()/1000);
  Note.findOneAndUpdate({_id: updateNoteRequest.noteId}, 
      {resolved: updateNoteRequest.resolved, lastModified: now}, {new: true}, (err, note) => {
        if (err){
          logger.error("Error: %j", err);
          callback(err, null);
        }
        logger.info("DB response with data: %j", note);
        let payload = formatNote(note);
        logger.info("Response payload data: %j", payload);
        callback(null, payload);
  });
});

/**
 * @returns an error or success message
 */
export const deleteNoteBackend = ((deleteNoteRequest, callback) => {
  logger.info("Enter updateNoteBackend with request body %j", deleteNoteRequest);
  Note.findOneAndRemove({_id: deleteNoteRequest.noteId}, function(err){
    if (err){
      logger.error("Error: %j", err);
      callback(err, null);
    }
    let payload = {message: ("Note " + deleteNoteRequest.noteId + " successfully removed")};
    logger.info("Response payload data: %j", payload);
    callback(null, payload);
  });
});

// gRPC doesn't allow using promises of async/await on the server-side, so callbacks are used
const getTickets = (call, callback) => getTicketsBackend(call.request, callback);
const createTicket = (call, callback) => createTicketBackend(call.request, callback);
const updateTicket = (call, callback) => updateTicketBackend(call.request, callback);
const deleteTicket = (call, callback) => deleteTicketBackend(call.request, callback);
const assignApplicant = (call, callback) => assignApplicantBackend(call.request, callback);
const addNote = (call, callback) => addNoteBackend(call.request, callback);
const updateNote = (call, callback) => updateNoteBackend(call.request, callback);
const deleteNote = (call, callback) => deleteNoteBackend(call.request, callback);

/**
 * Get a new server with the handler functions in this file bound to the methods
 * it serves.
 * @return {Server} The new server object
 */
function getServer() {
  const server = new grpc.Server();
  server.addService(javelin.Javelin.service, {
    getTickets,
    createTicket,
    updateTicket,
    deleteTicket,
    assignApplicant,
    addNote,
    updateNote,
    deleteNote,
  });
  return server;
}

const javelinPort = SERVICE_PORTS[SERVICE_NAMES.JAVELIN];

if (require.main === module) {
  // If this is run as a script, start a server on an unused port
  const routeServer = getServer();
  routeServer.bind(`0.0.0.0:${javelinPort}`, grpc.ServerCredentials.createInsecure());
  routeServer.start();
}

exports.getServer = getServer;
