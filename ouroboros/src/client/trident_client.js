const path = require('path');
const grpc = require('grpc');
const promisify = require('grpc-promisify');

const PROTO_PATH = path.join(__dirname, '/../../../common/proto/trident.proto');
const { trident } = grpc.load(PROTO_PATH);

const client = new trident.Trident('localhost:50051', grpc.credentials.createInsecure());
promisify(client);


const getGAPF = async (facultyId) => {
  const faculty = {
    facultyId,
  };
  const result = await client.GetGAPF(faculty);
  return result;
};

const submitGAPF = async (GAPF) => {
  const submittedGAPF = await client.SubmitGAPF(GAPF);
  return submittedGAPF;
};

const getAllGAPFStatus = async () => {
  const allGAPFStatus = await client.GetAllGAPFStatus({});
  return allGAPFStatus;
};

exports.GetGAPF = getGAPF;
exports.SubmitGAPF = submitGAPF;
exports.GetAllGAPFStatus = getAllGAPFStatus;
