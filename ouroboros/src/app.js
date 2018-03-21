import express from "express";
import logger from "./logger";
import tridentRoutes from "./endpoints/trident";
import populousRoutes from "./endpoints/populous";
import javelinRoutes from "./endpoints/javelin";
import { SERVICE_NAMES, SERVICE_PORTS } from "../common/config";

const app = express();
app.disable("x-powered-by");
logger.info("Starting Ouroboros");
app.use(express.json());

// Routes
app.use("/gapf", tridentRoutes);
app.use("/tickets", javelinRoutes);
app.use("/users", populousRoutes);

// Catch 404 and return 'Not found' message
app.use((req, res) => {
  res.status(404);

  // respond with json
  if (req.accepts("json")) {
    res.send({ error: "Not found" });
    return;
  }

  // default to plain-text. send()
  res.type("txt").send("Not found");
});

const { PORT = SERVICE_PORTS[SERVICE_NAMES.OUROBOROS] } = process.env;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); // eslint-disable-line no-console
