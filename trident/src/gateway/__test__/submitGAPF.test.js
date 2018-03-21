import { createSubmitGAPFObject, getSubmittedGAPF } from "../submitGAPF";
import * as utils from "../../utils";

describe("submitGAPF functions", () => {
  describe("createSubmitGAPFObject", () => {
    it("returns correct data", () => {
      utils.getUNIXTimestamp = jest.fn(() => 10000);
      const gapfRequest = {
        facultyId: 10,
        created: 10001
      };

      const expectedResponse = {
        attachedDocuments: [{}],
        created: 10001,
        facultyId: 10,
        lastModified: utils.getUNIXTimestamp(),
        status: "SUBMITTED"
      };
      expect(createSubmitGAPFObject(gapfRequest)).toEqual(expectedResponse);
    });
  });

  describe("getSubmittedGAPF", () => {
    const data = {
      facultyId: 10,
      created: 101,
      lastModified: 102,
      status: "SUBMITTED",
      attachedDocuments: [{}]
    };
    it("returns correct data", () => {
      expect(getSubmittedGAPF(data)).toEqual(data);
    });
    it("filters extra data", () => {
      const submittedData = {
        ...data,
        id: 10
      };
      expect(getSubmittedGAPF(submittedData)).toEqual(data);
    });
    it("filters on attachedDocuments data", () => {
      const submittedData = {
        ...data,
        attachedDocuments: [
          {
            _id: 101,
            name: "dummyName",
            link: "dummyLink",
            attachedDate: 104
          }
        ]
      };
      const expectedData = {
        ...data,
        attachedDocuments: [
          {
            name: "dummyName",
            link: "dummyLink",
            attachedDate: 104
          }
        ]
      };
      expect(getSubmittedGAPF(submittedData)).toEqual(expectedData);
    });
  });
});
