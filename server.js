import express from "express";
import swaggerUi from "swagger-ui-express";
import routes from "./src/routes/postsRoutes.js";
import swaggerSpec from './src/config/swaggerConfig.js';

// **Criando a aplicação Express**
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Configurar o Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static("uploads"));

routes(app);

// **Iniciando o servidor na porta 3000**
app.listen(3000, () => {
    console.log("Servidor escutando...");
});



