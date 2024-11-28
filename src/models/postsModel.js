import 'dotenv/config'
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// **Conectando ao banco de dados**
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// **Função assíncrona para buscar todos os posts do banco de dados**
export async function getTodosPosts() {
    // Acessando o banco de dados 'imersao_instabytes'
    const db = conexao.db("imersao_instabytes");
    // Acessando a coleção 'posts'
    const colecao = db.collection("posts");
    // Retornando todos os documentos da coleção como um array
    return colecao.find().toArray();
}

export async function salvar(novoPost) { 
     const db = conexao.db("imersao_instabytes"); 
     const colecao = db.collection("posts"); 
     return colecao.insertOne(novoPost);
}

export async function atualizar(id, novoPost) { 
    const db = conexao.db("imersao_instabytes"); 
    const colecao = db.collection("posts"); 
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id:new ObjectId(objID)}, {$set:novoPost});
}