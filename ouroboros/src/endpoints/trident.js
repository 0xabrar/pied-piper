import { Router } from "express";
import logger from "../logger";

const tridentClient = require("../client/trident_client");

const routes = Router();

/**
 * POST /gapf/submit
 *
 * body:
 * {
 *  facultyId: int,
 *  created: int,
 *  lastModified: int
 *  documents: Array(string, string, int)
 * }
 */
routes.post("/submit", async (request, result) => {
  logger.info("Received call to /gapf/submit endpoint");
  const gapf = request.body;

  // convert relevant request strings into integers
  gapf.facultyId = parseInt(gapf.facultyId, 10);
  gapf.created = parseInt(gapf.created, 10);
  gapf.lastModified = parseInt(gapf.lastModified, 10);
  if (gapf.documents !== undefined) {
    gapf.documents = gapf.documents.map(doc => {
      return {
        name: doc.name,
        link: doc.link,
        attachedDate: parseInt(doc.attachedDate, 10)
      };
    });
  }

  try {
    logger.info("Calling to Ticket Service with gapf body: %j", gapf);
    const response = await tridentClient.SubmitGAPF(gapf);
    logger.info("Received response from Ticket Service: %j", response);
    logger.info("Exiting /gapf/submit endpoint");
    result.json(response);
  } catch (err) {
    logger.error(
      "Received error from submitting to Ticket Service: ",
      err.message
    );
    // TODO: should add middleware later on to handle errors
    result.status(500);
    result.json({});
  }
});

/**
 * GET /gapf/get/:facultyId
 *
 * Get the GAPF associated with a specific faculty member based on
 * their facultyId.
 */
routes.get("/get/:facultyId", async (request, result) => {
  logger.info("Received called to /gapf/get/:facultyId endpoint");
  let { facultyId } = request.params;
  facultyId = parseInt(facultyId, 10);
  try {
    const response = await tridentClient.GetGAPF(facultyId);
    logger.info("Exiting /gapf/get/:facultyId endpoint");
    result.json(response);
  } catch (error) {
    logger.err("Received error from calling Ticket Service: %j", err.message);
    result.json({});
  }
});

routes.get("/all", async (request, result) => {
  logger.info("Received call to /gapf/all endpoint");
  try {
    const response = await tridentClient.GetAllGAPF();
    logger.info("Exiting /gapf/all endpoint");
    result.json(response);
  } catch (error) {
    logger.err("Received error from calling Ticket Service: %j", err.message);
    result.json({});
  }
});

export default routes;
