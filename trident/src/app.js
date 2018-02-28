import { SERVICE_NAMES, SERVICE_PORTS } from '../common/config';

const path = require('path');
const grpc = require('grpc');


const PROTO_PATH = path.join(__dirname, '/../common/proto/trident.proto');
const { trident } = grpc.load(PROTO_PATH);

/**
 * Call to Mongo client to store the given GAPF document and return the
 * document with active status.
 *
 * @param gapf the GAPF document to submit
 */
const submitGAPFBackend = gapf => ({
  facultyId: gapf.faculty,
  budgetRequested: gapf.budgetRequested,
  active: true,
});

/**
 * Retrieve the GAPF associated with a specific faculty member.
 *
 * @param faculty the Faculty to retrieve information for
 */
const retrieveGAPFInfo = faculty => ({
  facultyId: faculty.facultyId,
  budgetRequested: 0,
  active: true,
});

/**
 * @returns the Faculty and status associated with all GAPF documents
 */
const getAllGAPFStatusBackend = ((empty) => { // eslint-disable-line no-unused-vars
  const allGAPF = {
    statuses: [
      {
        faculty: {
          facultyId: 1,
        },
        submitted: false,
      },
      {
        faculty: {
          facultyId: 2,
        },
        submitted: true,
      },
    ],
  };
  return allGAPF;
});

// gRPC doesn't allow using promises of async/await on the server-side, so callbacks are used
const submitGAPF = (call, callback) => callback(null, submitGAPFBackend(call.request));
const getGAPF = (call, callback) => callback(null, retrieveGAPFInfo(call.request));
const getAllGAPFStatus = (call, callback) => callback(null, getAllGAPFStatusBackend(call.request));

/**
 * Get a new server with the handler functions in this file bound to the methods
 * it serves.
 * @return {Server} The new server object
 */
function getServer() {
  const server = new grpc.Server();
  server.addService(trident.Trident.service, {
    submitGapf: submitGAPF,
    getGapf: getGAPF,
    getAllGapfStatus: getAllGAPFStatus,
  });
  return server;
}

const tridentPort = SERVICE_PORTS[SERVICE_NAMES.TRIDENT];

if (require.main === module) {
  // If this is run as a script, start a server on an unused port
  const routeServer = getServer();
  routeServer.bind(`0.0.0.0:${tridentPort}`, grpc.ServerCredentials.createInsecure());
  routeServer.start();
}

exports.getServer = getServer;
