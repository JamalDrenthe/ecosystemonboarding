import { GoogleGenAI, Type } from "@google/genai";
import { AISimulationResult, Company } from '../types';

// Initialize Gemini Client
// IMPORTANT: The API key must be available in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeCompany = async (company: Company): Promise<AISimulationResult> => {
  if (!process.env.API_KEY) {
    return {
      description: "API Key not configured. Please check your environment variables.",
      services: ["N/A"],
      synergies: ["N/A"]
    };
  }

  const modelId = "gemini-3-flash-preview";
  
  const prompt = `
    You are a strategic business consultant. 
    Analyze the company named "${company.name}" which belongs to the "${company.group}" sector in our ecosystem.
    
    The ecosystem has these sectors:
    - Core: Central holdings, financial or key operational hubs.
    - Secondary: Supporting services or spin-offs.
    - Marketing: Lead generation, outreach, and branding.
    - Invest: External companies we invested in.
    - Software: Technical platforms and tools.

    Based solely on the name and its group, invent a plausible, professional business description (max 2 sentences).
    List 3 potential key services or products they might offer.
    List 2 potential synergies with other typical tech/finance companies.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            services: { type: Type.ARRAY, items: { type: Type.STRING } },
            synergies: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AISimulationResult;
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return {
      description: "Could not generate analysis at this time.",
      services: [],
      synergies: []
    };
  }
};

export const chatWithEcosystem = async (history: {role: string, content: string}[], message: string, contextCompanies: Company[]) => {
    if (!process.env.API_KEY) throw new Error("API Key missing");

    const contextStr = contextCompanies.map(c => `- ${c.name} (${c.group})`).join('\n');
    
    const systemInstruction = `You are the AI guardian of a corporate ecosystem. 
    Here is the list of companies in the network:
    ${contextStr}
    
    Answer questions about potential connections, strategy, or details. 
    Be creative but professional. Keep answers concise (max 150 words).`;

    const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
            systemInstruction,
        },
        history: history.map(h => ({
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{ text: h.content }]
        }))
    });

    const result = await chat.sendMessage({ message });
    return result.text;
}