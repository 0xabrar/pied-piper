
import { SERVICE_NAMES, SERVICE_PORTS, getServiceHost } from '../../common/config';

const path = require('path');
const grpc = require('grpc');
const promisify = require('grpc-promisify');

const PROTO_PATH = path.join(__dirname, '/../../../common/proto/javelin.proto');
const { javelin } = grpc.load(PROTO_PATH);

const javelinIdentifier = SERVICE_NAMES.JAVELIN;
const javelinHost = getServiceHost(javelinIdentifier);
const javelinPort = SERVICE_PORTS[javelinIdentifier];

const client = new javelin.Javelin(`${javelinHost}:${javelinPort}`, grpc.credentials.createInsecure());
promisify(client);

const getAllTickets = async () => {
  const response = await client.GetAllTickets({});
  return response;
};

const getTicket = async (getTicketRequest) => {
  const response = await client.GetTicket(getTicketRequest);
  return response;
};

const createTicket = async (createTicketRequest) => {
  const response = await client.CreateTicket(createTicketRequest);
  return response;
};

const updateTicket = async (modifyTicketRequest) => {
  const response = await client.UpdateTicket(modifyTicketRequest);
  return response;
};

const assignApplicant = async (modifyTicketRequest) => {
  const response = await client.AssignApplicant(modifyTicketRequest);
  return response;
};

const addNote = async (modifyTicketRequest) => {
  const response = await client.AddNote(modifyTicketRequest);
  return response;
};

const updateNote = async (modifyTicketRequest) => {
  const response = await client.UpdateNote(modifyTicketRequest);
  return response;
};

const deleteNote = async (modifyTicketRequest) => {
  const response = await client.DeleteNote(modifyTicketRequest);
  return response;
};


exports.GetAllTickets = getAllTickets;
exports.GetTicket = getTicket;
exports.CreateTicket = createTicket;
exports.UpdateTicket = updateTicket;
exports.AssignApplicant = assignApplicant;
exports.AddNote = addNote;
exports.UpdateNote = updateNote;
exports.DeleteNote = deleteNote;
