import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Basic information about the API
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title:
      "Scraping And Saving Historical Exchange Data from Yahoo Finance Website", // API title
    version: "1.0.0", // API version
    description: "A description of your API", // Description of your API
  },
  servers: [
    {
      url: "http://localhost:3000", // Server URL
    },
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: [
    "./src/routes/forex_data_routes.js",
    "./src/controllers/forex_data_controller.js",
  ], // Path to the API docs (where your routes are)
};

// Initialize swagger-jsdoc -> returns validated swagger spec in JSON format
const swaggerSpec = swaggerJSDoc(options);

const setupSwaggerDocs = (app) => {
  // Serve swagger docs
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Display a message for the Swagger docs route
  console.log("Swagger docs available at http://localhost:3000/api-docs");
};

export default setupSwaggerDocs;
