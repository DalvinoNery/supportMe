import 'dotenv/config'
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// **Conectando ao banco de dados**
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

function conectar(){
     // Acessando o banco de dados 'support_me'
     const db = conexao.db("support_me");
     if (!db) {
        throw new Error("Não foi possível conectar ao banco de dados.");
      }
     // Acessando a coleção 'chamados'
     return db.collection("chamados");

}

export async function list() {
    const colecao = conectar();
    return colecao.find().toArray();
}

export async function salvar(novoChamado) { 
    const colecao = conectar();
    return colecao.insertOne(novoChamado);
}

export async function buscarPorID(id) { 
    const colecao = conectar(); 
    const chamadoId  = ObjectId.createFromHexString(id);
    return colecao.findOne({ _id: chamadoId });
}