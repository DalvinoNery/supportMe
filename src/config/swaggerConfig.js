import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
        title: "InstaByte",
        version: "1.0.0",
        description: "API do Curso de Imersão Back-End Alura",
      },
    customSiteTitle: "InstaByte",
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor Local",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
export default swaggerSpec;
