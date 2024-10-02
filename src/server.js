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
// just a default response for empty requests, can remove it

app.get("/", (req, res) => {
  res.send({
    message:
      "hello welcome to my API, kindly use the following link to view the example results",
    link: `https://yahoo-finance-scrapper-api.onrender.com/api/forex-data?fromCurrency=USD&toCurrency=INR&period=10M`,
  });
});
app.listen(PORT, () => {
  // Scheduling jobs as server starts
  scheduleJobs("GBP", "INR");
  scheduleJobs("AED", "INR");
  console.log(`listening on port ${PORT}`);
});
