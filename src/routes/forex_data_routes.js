import express from "express";
import { forexData } from "../controllers/forex_data_controller.js";
const router = express.Router();
/**
 * @swagger
 * /api/forex-data:
 *   post:
 *     summary: Scrape the Yahoo Finance API and save the data in mySQL in memory
 *     description: Scraping data based on query input (currency1, currency2, timePeriod).
 *     parameters:
 *       - in: query
 *         name: fromCurrency
 *         schema:
 *           type: string
 *           example: USD
 *         required: true
 *         description: The base currency you want to convert from.
 *       - in: query
 *         name: toCurrency
 *         schema:
 *           type: string
 *           example: INR
 *         required: true
 *         description: The target currency you want to convert to.
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           example: 10M
 *         required: true
 *         description: The time period for the exchange rates (e.g., 1W, 1M, 10M, 1Y).
 *     responses:
 *       201:
 *         description: Data scraped and saved successfully.
 *       404:
 *         description: Not Found.
 */
router.get("/forex-data", forexData); // so that the data comes for the browser as well
router.post("/forex-data", forexData);
export default router;
