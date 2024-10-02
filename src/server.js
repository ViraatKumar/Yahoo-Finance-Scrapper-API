import express from "express";
import router from "./routes/forex_data_routes.js";
import scheduleJobs from "./scheduler/scheduler.js";
import setupSwaggerDocs from "../swagger.js";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
// All API calls routed through /api/
app.use("/api", router);
// Setting up swagger docs
setupSwaggerDocs(app);
app.listen(PORT, () => {
  // Scheduling jobs as server starts
  scheduleJobs("GBP", "INR");
  scheduleJobs("AED", "INR");
  console.log(`listening on port ${PORT}`);
});
