import cron from "node-cron";
import scrapeDataAndSave from "../controllers/helper.js";
const scheduleJobs = (currency1, currency2) => {
  /*
  @swagger
    Jobs are scheduled as such
        Every week, get past weeks data,
        Every Month, get past months data,
        and so on
    This was my understanding from the task and hence did it so
  */

  console.log("Scheduling jobs...");
  // An example schedule that runs every 1 minute to just show that the schedulesa are working

  cron.schedule("* * * * *", async () =>
    scrapeDataAndSave(currency1, currency2, "1W")
  );

  cron.schedule("0 0 * * 1", async () =>
    scrapeDataAndSave(currency1, currency2, "1W")
  );

  cron.schedule("0 0 1 * *", () =>
    scrapeDataAndSave(currency1, currency2, "1M")
  );

  cron.schedule("0 0 1 */3 *", () =>
    scrapeDataAndSave(currency1, currency2, "3M")
  );

  cron.schedule("0 0 1 */6 *", () =>
    scrapeDataAndSave(currency1, currency2, "6M")
  );

  cron.schedule("0 0 1 1 *", () =>
    scrapeDataAndSave(currency1, currency2, "1Y")
  );

  console.log("Jobs have been scheduled.");
};
export default scheduleJobs;
