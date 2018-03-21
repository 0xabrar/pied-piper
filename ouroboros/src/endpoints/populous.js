import { Router } from "express";
import logger from "../logger";

const populousClient = require("../client/populous_client");

const routes = Router();

routes.post("/:userType", async (request, result) => {
  logger.info("Received POST call to /users/:userType endpoint");
  const { userType } = request.params;
  const user = request.body;
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
});

routes.get("/:userType/:userId", async (request, result) => {
  logger.info("Received GET call to /users/:userType/:userId endpoint");
  const { userType } = request.params;
  const userId = parseInt(request.params.userId, 10);

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
});

routes.get("/:userType", async (request, result) => {
  logger.info("Received GET call to /users/:userType endpoint");
  const { userType } = request.params;

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
});

export default routes;
