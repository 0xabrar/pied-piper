import {
  SERVICE_NAMES,
  SERVICE_PORTS,
  getServiceHost
} from "../../common/config";

const path = require("path");
const grpc = require("grpc");
const promisify = require("grpc-promisify");

const PROTO_PATH = path.join(__dirname, "/../../../common/proto/javelin.proto");
const { javelin } = grpc.load(PROTO_PATH);

const javelinIdentifier = SERVICE_NAMES.JAVELIN;
const javelinHost = getServiceHost(javelinIdentifier);
const javelinPort = SERVICE_PORTS[javelinIdentifier];

const client = new javelin.Javelin(
  `${javelinHost}:${javelinPort}`,
  grpc.credentials.createInsecure()
);
promisify(client);

const getTickets = async getTicketRequest => {
  const response = await client.GetTickets(getTicketRequest);
  return response;
};

const createTicket = async createTicketRequest => {
  const response = await client.CreateTicket(createTicketRequest);
  return response;
};

const updateTicket = async modifyTicketRequest => {
  const response = await client.UpdateTicket(modifyTicketRequest);
  return response;
};

const deleteTicket = async (deleteTicketRequest) => {
  const response = await client.DeleteTicket(deleteTicketRequest);
  return response;
};

const assignApplicant = async (modifyTicketRequest) => {
  const response = await client.AssignApplicant(modifyTicketRequest);
  return response;
};

const addNote = async modifyTicketRequest => {
  const response = await client.AddNote(modifyTicketRequest);
  return response;
};

const updateNote = async (updateNoteRequest) => {
  const response = await client.UpdateNote(updateNoteRequest);
  return response;
};

const deleteNote = async (deleteNoteRequest) => {
  const response = await client.DeleteNote(deleteNoteRequest);
  return response;
};

exports.GetTickets = getTickets;
exports.CreateTicket = createTicket;
exports.UpdateTicket = updateTicket;
exports.DeleteTicket = deleteTicket
exports.AssignApplicant = assignApplicant;
exports.AddNote = addNote;
exports.UpdateNote = updateNote;
exports.DeleteNote = deleteNote;
