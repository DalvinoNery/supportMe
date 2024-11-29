import express from "express";
import cors from "cors";
import {cadastrar, listar} from "../controllers/chamadosController.js";

const corsOptions = {
    origin:"http://localhost:8000",
    optionsSuccessStartus:200
};


const routes = (app) =>{
    // **Middleware para interpretar JSON no corpo das requisições**
    app.use(express.json());
    app.use(cors(corsOptions))

 /**
 * @swagger
 * /chamados:
 *   get:
 *     summary: Lista todos os chamados
 *     description: Retorna uma lista de todos os chamados cadastrados.
 *     responses:
 *       200:
 *         description: Lista de chamados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   numeroChamado:
 *                     type: integer
 *                   problema:
 *                     type: string
 *                   resolucao:
 *                     type: string
 *                   sugestaoResposta:
 *                     type: string
 */
    app.get("/chamados", listar);
/**
 * @swagger
 * /chamados:
 *   post:
 *     summary: Cadastra um novo chamado
 *     description: Cria um novo chamado com os dados fornecidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numeroChamado:
 *                 type: integer
 *               problema:
 *                 type: string
 *                 required: true
 *               resolucao:
 *                 type: string
 *                 required: true
 *     responses:
 *       201:
 *         description: Chamado cadastrado com sucesso
 *       500:
 *         description: Erro ao cadastrar o chamado
 */
    app.post("/chamados",cadastrar);
};

export default routes;

