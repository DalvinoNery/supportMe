import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export default async function gerarSugestaoComGemini(problemaIdentificado, resolucao) {
  const prompt =
    "Atue com analista de suporte, crie uma resposta completa e concisa, destacando a solução, como se estivesse respondendo a um cliente, considerando o problema: " + problemaIdentificado+"\n A resolução para esse problema foi "+resolucao;

  try {
    const res = await model.generateContent(prompt);

    // Extrai apenas o texto da resposta da IA
    let descricao = res.response.text() || "Alt-text não disponível.";

    // Remove mensagens irrelevantes do início ou do final (ajuste conforme necessário)
    descricao = descricao.replace(/^.*?:\s*/, ""); // Remove texto inicial antes de ":" (se existir)

    return descricao.trim(); // Retorna apenas o texto limpo
  } catch (erro) {
    console.error("Erro ao obter alt-text:", erro.message, erro);
    throw new Error("Erro ao obter o alt-text do Gemini.");
  }
}