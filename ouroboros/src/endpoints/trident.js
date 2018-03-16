import { Router } from "express";

const tridentClient = require("../client/trident_client");

const routes = Router();

/**
 * POST /gapf/submit
 *
 * body:
 * {
 *  facultyId: int,
 *  budgetRequested: int
 * }
 */
routes.post("/submit", async (request, result) => {
  const gapf = request.body;
  gapf.facultyId = parseInt(gapf.facultyId, 10);
  gapf.budgetRequested = parseInt(gapf.budgetRequested, 10);

  const response = await tridentClient.SubmitGAPF(gapf);
  result.json(response);
});

/**
 * GET /gapf/get/:facultyId
 *
 * Get the GAPF associated with a specific faculty member based on
 * their facultyId.
 */
routes.get("/get/:facultyId", async (request, result) => {
  let { facultyId } = request.params;
  facultyId = parseInt(facultyId, 10);
  const response = await tridentClient.GetGAPF(facultyId);
  result.json(response);
});

routes.get("/all", async (request, result) => {
  const response = await tridentClient.GetAllGAPFStatus();
  result.json(response);
});

export default routes;
