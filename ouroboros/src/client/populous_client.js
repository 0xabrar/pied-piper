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
  const response = await client.AddFaculty(faculty);
  return response;
};

const getFaculty = async getFacultyRequest => {
  const response = await client.GetFaculty(getFacultyRequest);
  return response;
};

const updateFaculty = async faculty => {
  const response = await client.UpdateFaculty(faculty);
  return response;
};

const addApplicant = async applicant => {
  const response = await client.AddFaculty(applicant);
  return response;
};

const getApplicant = async getApplicantRequest => {
  const response = await client.GetApplicant(getApplicantRequest);
  return response;
};

const updateApplicant = async applicant => {
  const response = await client.UpdateApplicant(applicant);
  return response;
};

exports.AddFaculty = addFaculty;
exports.GetFaculty = getFaculty;
exports.UpdateFaculty = updateFaculty;

exports.AddApplicant = addApplicant;
exports.GetApplicant = getApplicant;
exports.UpdateApplicant = updateApplicant;
