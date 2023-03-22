const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Deel API Documentation",
      version: "1.0.0",
      description: "API documentation for Deel Task",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Deel Task API Server",
      },
    ],
  },

  apis: [`${__dirname}/routes/*`],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
