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
    data.map((row) => {
      insertData.run(row.date.toISOString().split("T")[0], row.open, row.close);
    });
    insertData.finalize();
  });
};

export { scrapeYahooFinance, saveToSQL };
