import { SERVICE_NAMES, SERVICE_PORTS } from '../common/config'

const path = require('path');
const grpc = require('grpc');

const PROTO_PATH = path.join(__dirname, '/../../common/proto/populous.proto');
const { populous } = grpc.load(PROTO_PATH);


/**
 * @param faculty Faculty to add
 */
const addFacultyBackend = ((faculty) => {
  return faculty;
});

/**
 * @param facultyRequest GetFacultyRequest to identify Faculty to retrieve
 */
const getFacultyBackend = ((facultyRequest) => {
  const { facultyId } = facultyRequest;
  return {
    facultyId,
    department: 'Networks',
  };
});

/**
 * @param faculty Faculty object to update
 */
const updateFacultyBackend = ((faculty) => {
  const { facultyId } = faculty;
  return {
    facultyId,
  };
});

/**
 * @param applicant Applicant to add
 */
const addApplicantBackend = ((applicant) => {
  return applicant;
});

/**
 * @param applicantRequest GetApplicantRequest to identify Applicant to retrieve
 */
const getApplicantBackend = ((applicantRequest) => {
  const { applicantId } = applicantRequest;
  return {
    applicantId,
  };
});

/**
 * @param applicant Applicant object to update
 */
const updateApplicantBackend = ((applicant) => {
  const { applicantId } = applicant;
  return {
    applicantId,
  };
});

// gRPC doesn't allow using promises of async/await on the server-side, so callbacks are used
const addFaculty = (call, callback) => callback(null, addFacultyBackend(call.request));
const getFaculty = (call, callback) => callback(null, getFacultyBackend(call.request));
const updateFaculty = (call, callback) => callback(null, updateFacultyBackend(call.request));

const addApplicant = (call, callback) => callback(null, addApplicantBackend(call.request));
const getApplicant = (call, callback) => callback(null, getApplicantBackend(call.request));
const updateApplicant = (call, callback) => callback(null, updateApplicantBackend(call.request));

/**
 * Get a new server with the handler functions in this file bound to the methods
 * it serves.
 * @return {Server} The new server object
 */
function getServer() {
  const server = new grpc.Server();
  server.addService(populous.Populous.service, {
    addFaculty,
    getFaculty,
    updateFaculty,

    addApplicant,
    getApplicant,
    updateApplicant,
  });
  return server;
}

const populousPort = SERVICE_PORTS[SERVICE_NAMES.POPULOUS];

if (require.main === module) {
  // If this is run as a script, start a server on an unused port
  const routeServer = getServer();
  routeServer.bind(`0.0.0.0:${populousPort}`, grpc.ServerCredentials.createInsecure());
  routeServer.start();
}

exports.getServer = getServer;
