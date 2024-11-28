import express from "express";
import multer from "multer";
import cors from "cors";
import {cadastrar, listar, uploadImagem, atualizarPost} from "../controllers/postsController.js";

const corsOptions = {
    origin:"http://localhost:8000",
    optionsSuccessStartus:200
};

//**Constante para manter o nome do arquivo que está sendo upado. Configuração no windows */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) =>{
    // **Middleware para interpretar JSON no corpo das requisições**
    app.use(express.json());
    app.use(cors(corsOptions))

  /**
 * @swagger
 * /posts:
 *   get:
 *     summary: Rota para buscar todos os posts.
 *     responses:
 *       200:
 *         description: Sucesso. Retorna uma lista de posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID do post.
 *                   titulo:
 *                     type: string
 *                     description: Título do post.
 *                   conteudo:
 *                     type: string
 *                     description: Conteúdo do post.
 *                   autor:
 *                     type: string
 *                     description: Autor do post.
 *                   imgUrl:
 *                     type: string
 *                     description: URL da imagem associada ao post.
 *                   alt:
 *                     type: string
 *                     description: Texto alternativo da imagem.
 *       500:
 *         description: Erro interno do servidor.
 */
    app.get("/posts", listar);
  /**
 * @swagger
 * /posts:
 *   post:
 *     summary: Rota para cadastrar um post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: O título do post.
 *               conteudo:
 *                 type: string
 *                 description: O conteúdo do post.
 *               autor:
 *                 type: string
 *                 description: O nome do autor do post.
 *             required:
 *               - titulo
 *               - conteudo
 *     responses:
 *       200:
 *         description: Sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID do post criado.
 *                 titulo:
 *                   type: string
 *                   description: O título do post.
 *                 conteudo:
 *                   type: string
 *                   description: O conteúdo do post.
 *                 autor:
 *                   type: string
 *                   description: O nome do autor do post.
 *       500:
 *         description: Erro interno do servidor.
 */
    app.post("/posts", cadastrar);
    /**
 * @swagger
 * /cadastrar:
 *   post:
 *     summary: Rota para cadastrar posts com upload de imagem.
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imagem:
 *                 type: string
 *                 format: binary
 *                 description: A imagem a ser enviada.
 *     responses:
 *       200:
 *         description: Sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID do post criado.
 *                 descricao:
 *                   type: string
 *                   description: Descrição do post.
 *                 imgUrl:
 *                   type: string
 *                   description: Caminho da imagem no servidor.
 *                 alt:
 *                   type: string
 *                   description: Texto alternativo da imagem.
 *       500:
 *         description: Erro interno do servidor.
 */
    app.post("/cadastrar", upload.single("imagem"), uploadImagem);

    /**
 * @swagger
 * /atualizar/{id}:
 *   put:
 *     summary: Atualiza um post com a descrição gerada e uma URL de imagem.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post a ser atualizado.
 *       - in: body
 *         name: body
 *         required: true
 *         description: Dados para atualizar o post.
 *         schema:
 *           type: object
 *           properties:
 *             alt:
 *               type: string
 *               description: Texto alternativo da imagem.
 *               example: "Descrição alternativa da imagem."
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imgUrl:
 *                   type: string
 *                   description: URL da imagem.
 *                 descricao:
 *                   type: string
 *                   description: Descrição gerada para a imagem.
 *                 alt:
 *                   type: string
 *                   description: Texto alternativo.
 *       400:
 *         description: Requisição inválida.
 *       500:
 *         description: Erro interno no servidor.
 */
    app.put("/atualizar/:id", atualizarPost);
};

export default routes;

