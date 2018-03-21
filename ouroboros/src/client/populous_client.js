import {
  SERVICE_NAMES,
  SERVICE_PORTS,
  getServiceHost
} from "../../common/config";

const path = require("path");
const grpc = require("grpc");
const promisify = require("grpc-promisify");

const PROTO_PATH = path.join(
  __dirname,
  "/../../../common/proto/populous.proto"
);
const { populous } = grpc.load(PROTO_PATH);

const populousIdentifier = SERVICE_NAMES.POPULOUS;
const populousHost = getServiceHost(populousIdentifier);
const populousPort = SERVICE_PORTS[populousIdentifier];

const client = new populous.Populous(
  `${populousHost}:${populousPort}`,
  grpc.credentials.createInsecure()
);
promisify(client);

const addFaculty = async faculty => {
  const response = client.AddFaculty(faculty);
  return response;
};

const getFaculty = async getFacultyRequest => {
  const response = client.GetFaculty(getFacultyRequest);
  return response;
};

const getAllFaculty = async () => {
  const response = client.GetAllFaculty({});
  return response;
};

const addApplicant = async applicant => {
  const response = client.AddApplicant(applicant);
  return response;
};

const getApplicant = async getApplicantRequest => {
  const response = client.GetApplicant(getApplicantRequest);
  return response;
};

const getAllApplicants = async () => {
  const response = client.GetAllApplicants({});
  return response;
};

exports.AddFaculty = addFaculty;
exports.GetFaculty = getFaculty;
exports.GetAllFaculty = getAllFaculty;

exports.AddApplicant = addApplicant;
exports.GetApplicant = getApplicant;
exports.GetAllApplicants = getAllApplicants;
