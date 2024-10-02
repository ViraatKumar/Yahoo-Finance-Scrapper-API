import { scrapeYahooFinance, saveToSQL } from "../scrappers/yahooScraper.js";
import db from "../database/db.js";
// set up helper functions so that i can use the scrapeDataAndSave method for controller and scheduler
function formatDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
// Extract time period based on the input 11M = 11 Months, 1Y = 1 Year
const extractPeriod = (period) => {
  let num = Number(period.slice(0, period.length - 1));
  let time = period[period.length - 1];
  const startDate = new Date();
  const endDate = new Date();
  console.log(endDate);
  switch (time) {
    case "Y":
    case "y":
      startDate.setFullYear(startDate.getFullYear() - num);
      break;
    case "M":
    case "m":
      startDate.setMonth(startDate.getMonth() - num);
      break;
    case "W":
    case "w":
      startDate.setDate(startDate.getDate() - num * 7);
      break;
    default:
      console.log("error");
  }

  return {
    from_date: formatDate(startDate),
    to_date: formatDate(endDate),
  };
};
const scrapeDataAndSave = async (from_currency, to_currency, period) => {
  return new Promise((resolve, reject) => {
    const quote = `${from_currency}${to_currency}%3DX`;
    const { from_date, to_date } = extractPeriod(period);
    scrapeYahooFinance(quote, from_date, to_date).then((data) => {
      db.serialize(() => {
        // Ensure saveToSQL runs synchronously within the serialize block
        saveToSQL(data.quotes);

        // Perform the SELECT query after saveToSQL is complete
        const query = `SELECT * FROM forex_data WHERE date BETWEEN ? AND ?`;

        // Query the data after ensuring the table has been populated
        db.all(query, [from_date, to_date], (err, rows) => {
          if (err) {
            return err;
          }

          resolve({ from_date, to_date, data: rows });
        });
      });
    });
  });
};
export default scrapeDataAndSave;
