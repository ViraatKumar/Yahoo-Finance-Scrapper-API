import yahooFinance from "yahoo-finance2";
import db from "../database/db.js";
// Using the npm package yahoo finance to scrape the data from the API
const scrapeYahooFinance = async (quote, fromDate, toDate) => {
  const queryOptions = { period1: fromDate, period2: toDate };
  const data = await yahooFinance.chart(quote, queryOptions);
  return data;
};
const saveToSQL = (data) => {
  db.serialize(() => {
    db.run(
      "CREATE TABLE IF NOT EXISTS forex_data (date TEXT, open REAL, close REAL)"
    );
    const insertData = db.prepare(
      "INSERT INTO forex_data(date,open,close) VALUES (?,?,?)"
    );
    console.log(data);
    data.map((row) => {
      insertData.run(row.date.toISOString().split("T")[0], row.open, row.close);
    });
    insertData.finalize();
    db.each("SELECT * FROM forex_data", (err, row) => {
      if (err) console.log(err.message);
      console.log(row);
    });
  });
};
// Example usage:
const toDate = "2024-10-01"; // Unix timestamp for the start date
const fromDate = "2024:10:01"; // Unix timestamp for the end date
const quote = "EURUSD%3DX"; // Use encoded quote

// scrapeYahooFinance(quote, fromDate, toDate)
//   .then((data) => {
//     saveToSQL(data.quotes);
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

export { scrapeYahooFinance, saveToSQL };
