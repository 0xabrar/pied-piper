import path from "path";
import mockingoose from "mockingoose";
import { loadSync } from "protobufjs";
import { submitGAPFBackend } from "../app";
import { invalidSubmitGAPFCallError } from "../gateway/submitGAPF";
import GAPFApplication from "../model/gapfApplication";

const PROTO_PATH = path.join(__dirname, "../../common/proto/trident.proto");
const protoRoot = loadSync(PROTO_PATH);
const GAPF = protoRoot.lookupType("trident.GAPF");

describe("endpoints test", () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  describe("submitGAPFBackend", () => {
    it("errors without a facultyId", async () => {
      const gapfRequest = {
        created: 101,
        lastModified: 300
      };
      const response = await submitGAPFBackend(gapfRequest);
      expect(response).toEqual(invalidSubmitGAPFCallError);
    });

    it("returns GAPF grPC response given valid data", async () => {
      const gapfRequest = {
        facultyId: 10,
        created: 101,
        lastModified: 300,
        attachedDocuments: [
          {
            name: "name1",
            link: "link1",
            attachedDate: 101
          },
          {
            name: "name2",
            link: "link2",
            attachedDate: 102
          }
        ]
      };
      mockingoose.GAPFApplication.toReturn(
        {
          _id: 132434,
          ...gapfRequest
        },
        "findOneAndUpdate"
      );
      const expectedResponse = {
        error: null,
        payload: GAPF.create(gapfRequest)
      };
      const response = await submitGAPFBackend(gapfRequest);
      expect(response).toEqual(expectedResponse);
    });
  });
});
