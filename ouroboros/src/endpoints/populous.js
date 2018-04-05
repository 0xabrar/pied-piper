import { Router } from "express";
import logger from "../logger";

const populousClient = require("../client/populous_client");

const routes = Router();

routes.post("/:userType", async (request, result) => {
  logger.info("Received POST call to /users/:userType endpoint");
  const { userType } = request.params;
  const user = request.body;
  try {
    if (userType === "faculty") {
      let response = await populousClient.AddFaculty(user);
      result.status(200);
      result.json(response);
    } else if (userType === "applicant") {
      let response = await populousClient.AddApplicant(user);
      result.status(200);
      result.json(response);
    } else {
      result.status(400);
      result.json({ error: "Invalid user type" });
    }
  } catch (err) {
    logger.error(`[User Service] ${err.message}`);
    result.status(400);
    result.json({ error: err.message });
  }
});

routes.get("/:userType/:userId", async (request, result) => {
  logger.info("Received GET call to /users/:userType/:userId endpoint");
  const { userType } = request.params;
  const userId = parseInt(request.params.userId, 10);

  try {
    if (userType === "faculty") {
      let response = await populousClient.GetFaculty({ facultyId: userId });
      result.status(200);
      result.json(response);
    } else if (userType === "applicant") {
      let response = await populousClient.GetApplicant({ applicantId: userId });
      result.status(200);
      result.json(response);
    } else {
      result.status(400);
      result.json({ error: "Invalid user type" });
    }
  } catch (err) {
    logger.error(`[User Service] ${err.message}`);
    result.status(400);
    result.json({ error: err.message });
  }
});

routes.get("/:userType", async (request, result) => {
  logger.info("Received GET call to /users/:userType endpoint");
  const { userType } = request.params;

  try {
    if (userType === "faculty") {
      let response = await populousClient.GetAllFaculty();
      result.status(200);
      result.json(response);
    } else if (userType === "applicant") {
      let response = await populousClient.GetAllApplicants();
      result.status(200);
      result.json(response);
    } else {
      result.status(400);
      result.json({ error: "Invalid user type" });
    }
  } catch (err) {
    logger.error(`[User Service] ${err.message}`);
    result.status(400);
    result.json({ error: err.message });
  }
});

routes.post("/faculty/:facultyId/tickets/domestic", async (request, result) => {
  logger.info(
    "Received POST call to /faculty/:facultyId/tickets/domestic endpoint"
  );
  const { facultyId } = request.params;

  const domesticTicketsRequest = {
    facultyId: parseInt(facultyId),
    ...request.body
  };
  try {
    let response = await populousClient.UpdateFacultyDomesticTickets(
      domesticTicketsRequest
    );
    result.status(200);
    result.json(response);
  } catch (err) {
    logger.error(`[User Service] ${err.message}`);
    result.status(400);
    result.json({ error: err.message });
  }
});

routes.post(
  "/faculty/:facultyId/tickets/international",
  async (request, result) => {
    logger.info(
      "Received POST call to /faculty/:facultyId/tickets/international endpoint"
    );
    const { facultyId } = request.params;

    const domesticTicketsRequest = {
      facultyId: parseInt(facultyId),
      ...request.body
    };
    try {
      let response = await populousClient.UpdateFacultyInternationalTickets(
        domesticTicketsRequest
      );
      result.status(200);
      result.json(response);
    } catch (err) {
      logger.error(`[User Service] ${err.message}`);
      result.status(400);
      result.json({ error: err.message });
    }
  }
);

export default routes;
