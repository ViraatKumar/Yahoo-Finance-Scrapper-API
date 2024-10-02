# Scraping Historical Exchange Data from Yahoo Finance
This project scrapes historical exchange data from Yahoo Finance and stores it in an in-memory database (SQLite). It provides a RESTful API to scrape and retrieve data for various currency pairs and time periods.

## Features

- Scrapes historical exchange data from Yahoo Finance.
- Stores scraped data in an in-memory SQLite database.
- Provides a REST API to fetch the scraped data.
- Automatically scheduled jobs using CRON for scraping data periodically.
- Interactive API documentation using Swagger.
## Table of Contents
- Installation
- API Endpoints
- Running the Project
## Clone the repository:

```
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```
Install dependencies: Make sure you have Node.js installed, then run:
```
npm install
```
Run the project:
```
npm start
```
## API Endpoints
Base URL
The base URL for all API endpoints is http://localhost:3000/api/
```
POST /api/forex-data
```
+ Description: Scrapes historical exchange data from Yahoo Finance and saves it.
#### Query Parameters:
- fromCurrency: The base currency (e.g., USD).
- toCurrency: The target currency (e.g., INR).
- period: The time period for the exchange data (e.g., 1W, 1M, 1Y).

## Running the Project
Start the Server:

```npm start```
This command will start the Node.js server on the port specified in your .env file or port 3000 by default.

Access Swagger Documentation: Visit http://localhost:3000/api-docs in your browser to view and test the API endpoints interactively.
