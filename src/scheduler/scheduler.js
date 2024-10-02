import cron from "node-cron";
import scrapeDataAndSave from "../controllers/helper.js";
const scheduleJobs = (currency1, currency2) => {
  // An example schedule that runs every 1 minute to just show that the schedulesa are working
  // uncomment it if you want to see it work, didnt enable since i am getting a free hosting service

  // cron.schedule("* * * * *", async () =>
  //   scrapeDataAndSave(currency1, currency2, "1W")
  // );

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
};
export default scheduleJobs;
