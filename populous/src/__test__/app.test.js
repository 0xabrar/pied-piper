import mockingoose from "mockingoose";
import applicant from "../models/applicant";
import faculty from "../models/faculty";
import {
  addFacultyBackend,
  addApplicantBackend,
  getAllFacultyBackend,
  getAllApplicantsBackend,
  getFacultyBackend,
  getApplicantBackend
} from "../app";

describe("endpoints test", () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  describe("faculty endpoints", () => {
    describe("addFacultyBackend", () => {
      it("returns Faculty grPC response given valid request", done => {
        const facultyRequest = {
          facultyId: 1,
          personalInfo: { firstName: "Tim", lastName: "Doe" },
          department: "math"
        };
        mockingoose.Faculty.toReturn(
          {
            _id: 123,
            ...facultyRequest
          },
          "save"
        );
        function callback(err, data) {
          expect(data).toEqual(facultyRequest);
          done();
        }
        addFacultyBackend(facultyRequest, callback);
      });

      // it("errors because of malformed request", () => {

      // });
    });

    describe("getAllFacultyBackend", () => {
      it("returns FacultyList grPC response given valid request", done => {
        const facultyList = [
          {
            facultyId: 1,
            personalInfo: { firstName: "Tim", lastName: "Doe" },
            department: "math"
          },
          {
            facultyId: 2,
            personalInfo: { firstName: "Jane", lastName: "Jo" },
            department: "cs"
          }
        ];
        mockingoose.Faculty.toReturn(facultyList, "find");
        function callback(err, data) {
          expect(data).toEqual(facultyList);
          done();
        }
        getAllFacultyBackend({}, callback);
      });

      // it("errors because of malformed request", () => {

      // });
    });

    describe("getFacultyBackend", () => {
      it("returns Faculty grPC response given valid request", done => {
        const faculty = {
          facultyId: 1,
          personalInfo: { firstName: "Tim", lastName: "Doe" },
          department: "math"
        };
        mockingoose.Faculty.toReturn(faculty, "findOne");
        function callback(err, data) {
          expect(data).toEqual(faculty);
          done();
        }
        getFacultyBackend({}, callback);
      });

      // it("errors because of malformed request", () => {

      // });
    });
  });

  describe("applicant endpoints", () => {
    describe("addApplicantBackend", () => {
      it("returns Applicant grPC response given valid request", done => {
        const applicantRequest = {
          applicantId: 1,
          personalInfo: { firstName: "Tim", lastName: "Doe" }
        };
        mockingoose.Applicant.toReturn(
          {
            _id: 123,
            ...applicantRequest
          },
          "save"
        );
        function callback(err, data) {
          expect(data).toEqual(applicantRequest);
          done();
        }
        addApplicantBackend(applicantRequest, callback);
      });

      // it("errors because of malformed request", () => {

      // });
    });

    describe("getAllApplicantsBackend", () => {
      it("returns ApplicantList grPC response given valid request", done => {
        const applicantList = [
          {
            applicantId: 1,
            personalInfo: { firstName: "Jim", lastName: "Last" }
          },
          {
            applicantId: 2,
            personalInfo: { firstName: "Cindy", lastName: "Li" }
          }
        ];
        mockingoose.Applicant.toReturn(applicantList, "find");
        function callback(err, data) {
          expect(data).toEqual(applicantList);
          done();
        }
        getAllApplicantsBackend({}, callback);
      });

      // it("errors because of malformed request", () => {

      // });
    });
  });

  describe("getApplicantBackend", () => {
    it("returns Applicant grPC response given valid request", done => {
      const applicant = {
        applicantId: 1,
        personalInfo: { firstName: "Tim", lastName: "Doe" }
      };
      mockingoose.Applicant.toReturn(applicant, "findOne");
      function callback(err, data) {
        expect(data).toEqual(applicant);
        done();
      }
      getApplicantBackend({}, callback);
    });

    // it("errors because of malformed request", () => {

    // });
  });
});
