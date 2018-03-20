import grpc from "grpc";
import { getUNIXTimestamp } from "../utils";

export const createSubmitGAPFObject = gapfRequest => {
  const now = getUNIXTimestamp();
  const {
    facultyId,
    status = "SUBMITTED",
    created = now,
    attachedDocuments = [{}]
  } = gapfRequest;

  return {
    facultyId: facultyId,
    created: created,
    lastModified: now,
    status: status,
    attachedDocuments: attachedDocuments
  };
};

export const getSubmittedGAPF = submittedForm => {
  return {
    facultyId: submittedForm.facultyId,
    created: submittedForm.created,
    lastModified: submittedForm.lastModified,
    status: submittedForm.status,
    attachedDocuments: submittedForm.attachedDocuments.map(doc => {
      // removing _id from document data
      return {
        name: doc.name,
        link: doc.link,
        attachedDate: doc.attachedDate
      };
    })
  };
};

export const invalidSubmitGAPFCallError = {
  error: {
    message: "facultyId missing from request body",
    status: grpc.status.INVALID_ARGUMENT
  },
  payload: null
};
