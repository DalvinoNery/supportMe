import fs from "fs";
import {list, salvar, buscarPorID} from "../models/chamadosModel.js";
import gerarSugestaoComGemini from "../services/geminiService.js";

export async function listar(req, res) {
    try {
        const resultado = await list();
        res.status(200).json(resultado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ Erro: "Falha na requisição" });
    }
}

export async function cadastrar(req, res) {
    try{
        const sugestaoResposta = await gerarSugestaoComGemini(req.body.problema, req.body.resolucao);
        const chamado ={
            numeroChamado: req.body.numeroChamado,
            problema:req.body.problema,
            resolucao: req.body.resolucao,
            sugestaoResposta: sugestaoResposta
        }
        const chamadoCriado = await  salvar(chamado); 
        const chamadoCompleto = await buscarPorID(chamadoCriado.insertedId.toHexString())
         res.status(201).json(chamadoCompleto);
    }catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro" : "Falha na requisição"});
    }
    
}

 

