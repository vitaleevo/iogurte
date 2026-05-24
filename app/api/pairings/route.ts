import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Gemini with the API Key and telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export async function POST(req: NextRequest) {
  try {
    const { flavor, occasion } = await req.json();

    const systemPrompt = `Você é o Sommelier Gourmet de Iogurtes da L'Or Blanc, uma marca de iogurtes artesanais de luxo.
Sua linguagem é poética, sofisticada, minimalista, refinada e repleta de termos sensoriais em português de Portugal.
Evite formatação excessiva com vários marcadores. Desenvolva uma descrição fluida de sommelier (máximo 120 palavras) explicando o porquê de os ingredientes combinarem de forma espetacular na textura e nas notas de sabor.
Retorne um objeto JSON perfeito com as seguintes propriedades em formato estrito (todas como strings ou arrays):
- title: um título poético e luxuoso para a combinação especial (ex: "Sinfonia do Bosque e Lavanda")
- description: um parágrafo literário envolvente e refinado que retrate a degustação sensorial
- ingredients: um array simples de string com 3 a 4 itens adicionais recomendados para polvilhar ou colocar sobre o iogurte
- beverage: recomendação de uma bebida sofisticada para harmonizar (ex: "Infusão Gelada de Chá Verde e Jasmim")`;

    const userPrompt = `Recomende uma harmonização artística e premium para o iogurte artesanal sabor "${flavor}" para a seguinte ocasião especial: "${occasion}".`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No text response from GenAI");
    }

    // Try parsing the response to verify JSON
    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error generating pairing recommendation:", error);
    // Return a beautiful luxurious fallback
    return NextResponse.json({
      title: "Harmonização Provisória d'Or",
      description: "Uma delicada harmonia criada para transcender o quotidiano. A acidez elegante e a cremosidade pura do nosso iogurte unem-se a um fio de néctar orgânico e notas crocantes ligeiramente tostadas, proporcionando uma textura envolvente.",
      ingredients: [
        "Bagos de romã fresca",
        "Amêndoas do Douro tostadas e laminadas",
        "Pó de ouro comestível de 24k"
      ],
      beverage: "Espumante Bairrada Brut Rosé"
    });
  }
}
