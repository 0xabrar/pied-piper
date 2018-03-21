import { SERVICE_NAMES, SERVICE_PORTS, MONGO_CONFIG } from "../common/config";
import logger from "./logger";

const path = require("path");
const grpc = require("grpc");

const PROTO_PATH = path.join(__dirname, "/../../common/proto/populous.proto");
const { populous } = grpc.load(PROTO_PATH);

const mongoose = require("mongoose");

const Applicant = require("./models/applicant.js");
const Faculty = require("./models/faculty.js");

mongoose.connect(MONGO_CONFIG.HOST);

mongoose.connection.on("connected", () => {
  logger.info(`Mongoose default connection open to ${MONGO_CONFIG.HOST}`);
});

// If the connection throws an error
mongoose.connection.on("error", err => {
  logger.error(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  logger.info("Mongoose default connection disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    logger.info(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

const formatFaculty = faculty => {
  if (faculty === null) {
    return {};
  }
  return {
    facultyId: faculty.facultyId,
    personalInfo: {
      firstName: faculty.personalInfo.firstName,
      lastName: faculty.personalInfo.lastName
    },
    department: faculty.department
  };
};

const formatApplicant = applicant => {
  if (applicant === null) {
    return {};
  }
  return {
    applicantId: applicant.applicantId,
    personalInfo: {
      firstName: applicant.personalInfo.firstName,
      lastName: applicant.personalInfo.lastName
    }
  };
};

/**
 * @param faculty Faculty to add
 */
export const addFacultyBackend = (faculty, callback) => {
  const facultyDocument = new Faculty(faculty);
  facultyDocument.save(err => {
    if (err) {
      callback(err, null);
    }
    callback(null, formatFaculty(facultyDocument));
  });
};

/**
 * @param facultyRequest GetFacultyRequest to identify Faculty to retrieve
 */
export const getFacultyBackend = (facultyRequest, callback) => {
  Faculty.findOne({ facultyId: facultyRequest.facultyId }, (err, faculty) => {
    if (err) {
      callback(err, null);
    }
    callback(null, formatFaculty(faculty));
  });
};

/**
 * @param facultyRequest GetFacultyRequest to identify Faculty to retrieve
 */
export const getAllFacultyBackend = (empty, callback) => {
  Faculty.find({}, (err, faculty) => {
    if (err) {
      callback(err, null);
    }
    callback(null, faculty.map(formatFaculty));
  });
};

/**
 * @param applicant Applicant to add
 */
export const addApplicantBackend = (applicant, callback) => {
  const applicantDocument = new Applicant(applicant);
  applicantDocument.save(err => {
    if (err) {
      callback(err, null);
    }
    callback(null, formatApplicant(applicantDocument));
  });
};

/**
 * @param applicantRequest GetApplicantRequest to identify Applicant to retrieve
 */
export const getApplicantBackend = (applicantRequest, callback) => {
  Applicant.findOne(
    { applicantId: applicantRequest.applicantId },
    (err, applicant) => {
      if (err) {
        callback(err, null);
      }
      callback(null, formatApplicant(applicant));
    }
  );
};

/**
 * @param applicantRequest GetApplicantRequest to identify Applicant to retrieve
 */
export const getAllApplicantsBackend = (empty, callback) => {
  Applicant.find({}, (err, applicants) => {
    if (err) {
      callback(err, null);
    }
    callback(null, applicants.map(formatApplicant));
  });
};

// gRPC doesn't allow using promises of async/await on the server-side, so callbacks are used
const addFaculty = (call, callback) =>
  addFacultyBackend(call.request, callback);
const getFaculty = (call, callback) =>
  getFacultyBackend(call.request, callback);
const getAllFaculty = (call, callback) =>
  getAllFacultyBackend(call.request, callback);

const addApplicant = (call, callback) =>
  addApplicantBackend(call.request, callback);
const getApplicant = (call, callback) =>
  getApplicantBackend(call.request, callback);
const getAllApplicants = (call, callback) =>
  getAllApplicantsBackend(call.request, callback);

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
    getAllFaculty,

    addApplicant,
    getApplicant,
    getAllApplicants
  });
  return server;
}

const populousPort = SERVICE_PORTS[SERVICE_NAMES.POPULOUS];

if (require.main === module) {
  // If this is run as a script, start a server on an unused port
  const routeServer = getServer();
  routeServer.bind(
    `0.0.0.0:${populousPort}`,
    grpc.ServerCredentials.createInsecure()
  );
  routeServer.start();
}

exports.getServer = getServer;
