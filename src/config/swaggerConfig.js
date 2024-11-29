import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
        title: "SupportMe",
        version: "1.0.0",
        description: "API back-end para auxiliar o suporte nas resposta de retorno ao usuário",
      },
    customSiteTitle: "SupportMe",
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
