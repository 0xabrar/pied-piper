const path = require('path');
const grpc = require('grpc');

const PROTO_PATH = path.join(__dirname, '/../../common/proto/trident.proto');
const { trident } = grpc.load(PROTO_PATH);

const retrieveGAPFInfo = faculty => ({
  facultyId: faculty.facultyId,
  submitted: false,
  budgetRequested: 0,
  active: true,
});

const getGAPF = (call, callback) => callback(null, retrieveGAPFInfo(call.request));

/**
 * Get a new server with the handler functions in this file bound to the methods
 * it serves.
 * @return {Server} The new server object
 */
function getServer() {
  const server = new grpc.Server();
  server.addService(trident.Trident.service, {
    getGapf: getGAPF,
  });
  return server;
}

if (require.main === module) {
  // If this is run as a script, start a server on an unused port
  const routeServer = getServer();
  routeServer.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  routeServer.start();
}

exports.getServer = getServer;
