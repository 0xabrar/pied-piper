const path = require('path');
const grpc = require('grpc');
const async = require('async');

const PROTO_PATH = path.join(__dirname, '/../../../common/proto/trident.proto');
const { trident } = grpc.load(PROTO_PATH);

const client = new trident.Trident('localhost:50051', grpc.credentials.createInsecure());

const runGetGAPF = (callback) => {
  const faculty = {
    facultyId: 409146138,
  };

  const gapfCallback = (error, info) => {
    if (error) {
      console.log(error);
      callback(error);
      return;
    }
    console.log(info);
  };
  client.getGapf(faculty, gapfCallback);
};

function main() {
  async.series([
    runGetGAPF,
  ]);
}

if (require.main === module) {
  main();
}

exports.runGetGAPF = runGetGAPF;
